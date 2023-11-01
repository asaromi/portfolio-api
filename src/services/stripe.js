require('dotenv').config()

class StripeService {
  stripe

  constructor(stripeSk) {
    this.stripe = require('stripe')(stripeSk)
  }

  checkoutSession = async ({ email, items }) => {
    const transformedItems = items.map((item) => ({
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          description: item.description,
          name: item.title,
          images: [item.image],
        }
      }
    }))

    return (await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'SG', 'AU'],
      },
      // shipping_options: [{
      //   shipping_rate: 'shr_1NvzTwK8NzQPZLeRgL1zQfSf'
      // }],
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${process.env.APP_URL}/checkout?success=true`,
      cancel_url: `${process.env.APP_URL}/checkout?canceled=true`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    }))
  }
}

module.exports = StripeService
