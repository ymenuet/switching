import express from 'express'
const router = express.Router()
import {
  getFormations,
  getFormationById,
  deleteFormation,
  createFormation,
} from '../controllers/formationsController.js'
import { protect, mustBeAdmin } from '../middleware/authMiddleware.js'

router.route('/').get(getFormations)
router
  .route('/:id')
  .get(getFormationById)
  .delete(deleteFormation, protect, mustBeAdmin)

export default router
