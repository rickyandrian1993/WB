import express from 'express'
import { GetVehicle, InsertVehicle } from '../controllers/vehicleController.js'

const router = express.Router()

router.post('/', (req, res) => {
  GetVehicle((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert', (req, res) => {
  InsertVehicle(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
