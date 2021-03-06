import Stripe from 'stripe'
import asyncHandler from 'express-async-handler'
import express from 'express'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

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
        // Assuming payment is received by now
        // If user has an account, just add the formation to the user in DB
        // If not, create a user with that email

        const user = await User.findOne({ email: req.body.email })

        if (user) {
          await user.formations.push(req.body.formation)
          await user.save()
        } else {
          res.status(400).json('request failed in payment routes.')
        }

        // In any case, send an email to user with "Accéder à ma formation" link
        // This link redirects to login page. If user exists, classic login.
        // If user doesn't exist, form that will ask for more info to finish creating account.
        // Then, both kind of users would be able to access same platform
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
      }
    } else {
      res.setHeader('Allow', 'POST')
      res.status(405).end('Method not allowed')
    }
  })
)

export default router
