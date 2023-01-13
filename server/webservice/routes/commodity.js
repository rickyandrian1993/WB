import express from 'express'
import { GetCommodity, InsertCommodity } from '../controllers/commodityController.js'

const router = express.Router()

router.post('/', (_, res) => {
  GetCommodity((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert', (req, res) => {
  InsertCommodity(req, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
