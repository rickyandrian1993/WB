import express from 'express'
import { getSupplier, addSupplier, deleteSupplier } from '../controllers/supplierController.js'

const router = express.Router()

router.post('/', getSupplier)
router.post('/insert', addSupplier)
router.post('/delete', deleteSupplier)

export default router
