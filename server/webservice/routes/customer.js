import express from 'express'
import { GetCustomer, InsertCustomer } from '../controllers/customerController.js'

const router = express.Router()

router.post('/', (_, res) => {
  GetCustomer((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert', (req, res) => {
  InsertCustomer(req, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
