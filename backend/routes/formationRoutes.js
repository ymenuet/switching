import express from 'express'
const router = express.Router()
import {
  getFormations,
  getFormationById,
} from '../controllers/formationController.js'

router.route('/').get(getFormations)
router.route('/:id').get(getFormationById)

export default router
