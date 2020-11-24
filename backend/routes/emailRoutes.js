import asyncHandler from 'express-async-handler'
import express from 'express'
import sendEmail from '../utils/email.js'

const router = express.Router()

router.route('/').post(
  asyncHandler(async (req, res) => {
    const email = {
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html,
    }
    await sendEmail(email)
    res.status(201).json()
  })
)

export default router
