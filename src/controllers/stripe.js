const { NEXT_AMAZON } = require('../libs/constant')
const { errorResponse, successResponse } = require('../libs/response')

const StripeService = require('../services/stripe')
// const OrderService = require('../services/order')
const amazonStripeService = new StripeService(NEXT_AMAZON.STRIPE_SK, NEXT_AMAZON.APP_URL)
const { amazonFirestore, amazonFirebaseService } = require('../databases/firestore')

exports.checkoutSession = async (req, res) => {
	console.group('checkoutSession')
	try {
		const { email, items } = req.body
		console.log(items)

		console.log('trying generate checkout session')

		const session = await amazonStripeService.checkoutSession({ email, items })
		const data = {
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: amazonFirestore.FieldValue.serverTimestamp(),
		}

		await amazonFirebaseService.setDocument({ data, ref: `users/${email}/orders/${session.id}` })
		return successResponse(res, { data: session })
	} catch (error) {
		console.error(error)
		return errorResponse(res, { error })
	} finally {
		console.groupEnd()
	}
}

exports.listenAmazonWebhook = async (req, res) => {
	const signature = req.headers['stripe-signature']

	console.log('reqBody', req.body)

	let event
	try {
		event = amazonStripeService.stripe.webhooks.constructEvent(
			req.body,
			signature,
			NEXT_AMAZON.STRIPE_SIGN,
		)

		if (event.type !== 'checkout.session.completed') return successResponse(res, { statusCode: 204 })

		const session = event.data.object
		const data = {
			updated_at: amazonFirestore.FieldValue.serverTimestamp(),
		}

		await amazonFirebaseService.setDocument({
			data,
			ref: `users/${session.metadata.email}/orders/${session.id}`,
			merge: true,
		})

		return successResponse(res, { data: { ...data, session } })
	} catch (error) {
		console.error(error)
		return errorResponse(res, { error })
	}

}
