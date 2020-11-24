import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK)
// console.log('stripe:', stripe)

export default async (req, res) => {
  // console.log('api key:', process.env.STRIPE_SK)
  if (req.method == 'POST') {
    try {
      // console.log('REQ', req.headers)
      // console.log('RES', res.headers)
      const { amount } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      })
      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
