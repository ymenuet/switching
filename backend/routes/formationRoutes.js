import express from 'express'
const router = express.Router()
import {
  getFormations,
  getFormationById,
  deleteFormation,
  createFormation,
  updateFormation,
} from '../controllers/formationsController.js'
import { protect, mustBeAdmin } from '../middleware/authMiddleware.js'

router.route('/').get(getFormations).post(createFormation, protect, mustBeAdmin)
router
  .route('/:id')
  .get(getFormationById)
  .delete(deleteFormation, protect, mustBeAdmin)
  .put(updateFormation, protect, mustBeAdmin)

export default router
