import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/usersController.js'
import { protect, mustBeAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, mustBeAdmin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, mustBeAdmin, deleteUser)
  .get(protect, mustBeAdmin, getUserById)
  .put(protect, mustBeAdmin, updateUser)
// router.route('/:id/formations').post(addFormationToUser)

export default router
