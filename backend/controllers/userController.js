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

export { authUser, registerUser, getUserProfile }
