import Stripe from 'stripe'
import asyncHandler from 'express-async-handler'
import express from 'express'

const router = express.Router()

const stripe = Stripe(process.env.STRIPE_SK)

router.route('/').post(
  asyncHandler(async (req, res) => {
    if (req.method == 'POST') {
      try {
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
  })
)

export default router
