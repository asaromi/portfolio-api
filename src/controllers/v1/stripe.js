const {buffer} = require('micro')
const {NEXT_AMAZON} = require('../../helpers/constant')
const {errorResponse, successResponse} = require('../../helpers/response')
const serviceAccount = require('../../../firebase.key.json')

const FirebaseService = require('../../services/firebase')
const StripeService = require('../../services/stripe')
const amazonStripeService = new StripeService(NEXT_AMAZON.STRIPE_SK)
const firebaseService = new FirebaseService(serviceAccount)
const firestore = firebaseService.admin.firestore

exports.checkoutSession = async (req, res) => {
  console.group('checkoutSession')
  try {
    const {email, items} = req.body
    console.log(items)

    console.log('trying generate checkout session')

    const session = await amazonStripeService.checkoutSession({email, items})
    const ref = `users/${email}/orders/${session.id}`
    const data = {
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: firestore.FieldValue.serverTimestamp()
    }

    console.log('trying add data', data)
    console.log('to document', ref)

    return successResponse(res, {data: session})
  } catch (error) {
    console.error(error)
    return errorResponse(res, {error})
  } finally {
    console.groupEnd()
  }
}

exports.listenAmazonWebhook = async (req, res) => {
  const requestBuffer = await buffer(req)
  const payload = requestBuffer.toString()
  const signature = req.headers['stripe-signature']

  try {
    const event = amazonStripeService.stripe.webhooks.constructEvent(
      payload,
      signature,
      NEXT_AMAZON.STRIPE_SHIPPING
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      const data = {
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: firestore.FieldValue.serverTimestamp()
      }

      return await firebaseService.firestoreSetDocument({
        data,
        ref: `users/${session.metadata.email}/orders/${session.id}`,
        merge: true
      })
        .then(() => successResponse(res))
        .catch((error) => errorResponse(res, {error, statusCode: 500}))
    }
  } catch (error) {
    return errorResponse(res, {error})
  }
}
