import express from 'express'
import asyncHandler from 'express-async-handler'
import Formation from '../models/Formation.js'
import mongoose from 'mongoose'
const router = express.Router()

// @desc      Fetch all formation
// @route     GET /api/formations
// @access    Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // .find({}) finds all formation objects
    const formations = await Formation.find({})
    res.json(formations)
  })
)

// @desc      Fetch single formation
// @route     GET /api/formation/id
// @access    Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const formation = await Formation.findById(req.params.id)
      if (formation) return res.json(formation)
    }
    res.status(404)
    throw new Error('Formation not found')
  })
)

export default router
