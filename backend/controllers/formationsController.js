import asyncHandler from 'express-async-handler'
import Formation from '../models/Formation.js'
import mongoose from 'mongoose'

// @desc      Fetch all formation
// @route     GET /api/formations
// @access    Public
const getFormations = asyncHandler(async (req, res) => {
  // .find({}) finds all formation objects
  const formations = await Formation.find({})
  res.json(formations)
})

// @desc      Fetch single formation
// @route     GET /api/formation/id
// @access    Public
const getFormationById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const formation = await Formation.findById(req.params.id)
    if (formation) return res.json(formation)
  }
  res.status(404)
  throw new Error('Formation not found')
})

// @desc      Delete formation
// @route     DELETE /api/foramtions/:id
// @access    Private/admin
const deleteFormation = asyncHandler(async (req, res) => {
  const formation = await Formation.findById(req.params.id)
  if (formation) {
    await formation.remove()
    res.json({ message: 'Formation removed' })
  } else {
    res.status(404)
    throw new Error('Formation not found')
  }
})

// @desc      Create formation
// @route     POST /api/formations
// @access    Private/admin
const createFormation = asyncHandler(async (req, res) => {
  const formation = new Formation({
    title: 'Sample title',
    shortDescription: 'Sample short description',
    longDescription: 'Sample long description',
    logo: '/images/samples/sample-logo.png',
    backgroundImage: '/images/samples/sample-background-image.png',
    thumbnail: '/images/samples/sample-thumbnail.jpg',
    demoVideo: 'https://vimeo.com/259400046',
    price: 10,
    difficulty: 2,
  })
  const createdFormation = await formation.save()
  res.status(201).json(createdFormation)
})

// @desc      Update formation
// @route     POST /api/formations/:id
// @access    Private/admin
const updateFormation = asyncHandler(async (req, res) => {
  const {
    title,
    shortDescription,
    longDescription,
    logo,
    backgroundImage,
    thumbnail,
    demoVideo,
    price,
    difficulty,
  } = req.body

  const formation = await Formation.findById(req.params.id)
  if (formation) {
    formation.title = title
    formation.shortDescription = shortDescription
    formation.longDescription = longDescription
    formation.logo = logo
    formation.backgroundImage = backgroundImage
    formation.thumbnail = thumbnail
    formation.demoVideo = demoVideo
    formation.price = price
    formation.difficulty = difficulty
    const updatedFormation = await formation.save()
    res.json(updatedFormation)
  } else {
    res.status(404)
    throw new Error('Formation not found')
  }
})

export {
  getFormations,
  getFormationById,
  deleteFormation,
  createFormation,
  updateFormation,
}
