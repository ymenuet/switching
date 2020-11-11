import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// @desc      Auth user & get token
// @route     POST /api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.email,
      birthDate: user.birthDate,
      avatar: user.avatar,
      residentialAddress: user.residentialAddress,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Email or password is invalid')
  }
})

// @desc      Get user profile
// @route     GET api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.email,
      birthDate: user.birthDate,
      avatar: user.avatar,
      residentialAddress: user.residentialAddress,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// @desc      Register user
// @route     POST api/users
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    birthDate,
    avatar,
    residentialAddress,
    phoneNumber,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User aleady exists')
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    birthDate,
    avatar,
    residentialAddress,
    phoneNumber,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.email,
      birthDate: user.birthDate,
      avatar: user.avatar,
      residentialAddress: user.residentialAddress,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc      Update user profile
// @route     PUT api/users/profile
// @access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.birthDate = req.body.birthDate || user.birthDate
    user.avatar = req.body.avatar || user.avatar
    user.residentialAddress =
      req.body.residentialAddress || user.residentialAddress
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      firstName: updatedUser.firstName,
      lastName: updatedUser.email,
      birthDate: updatedUser.birthDate,
      avatar: updatedUser.avatar,
      residentialAddress: updatedUser.residentialAddress,
      phoneNumber: updatedUser.phoneNumber,
      token: generateToken(updatedUser._id),
    })
    console.log(user)
    console.log(updatedUser)
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

export { authUser, registerUser, getUserProfile, updateUserProfile }
