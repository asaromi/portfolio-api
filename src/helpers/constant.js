require('dotenv').config()

exports.NEXT_AMAZON = {
  STRIPE_PK: process.env.STRIPE_PK_AMAZON || null,
  STRIPE_SK: process.env.STRIPE_SK_AMAZON || null,
  STRIPE_SIGN: process.env.STRIPE_SIGN_AMAZON || null,
  STRIPE_SHIPPING: process.env.STRIPE_SHIPPING_AMAZON || null,
}

exports.STRIPE_CHECKOUT_STAT = {
  SESSION_FAILED: 'checkout.session.async_payment_failed',
  SESSION_SUCCEED: 'checkout.session.async_payment_succeeded',
  SESSION_COMPLETED: 'checkout.session.completed',
  SESSION_EXPIRED: 'checkout.session.expired'
}
