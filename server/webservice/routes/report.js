import express from 'express'
import { GetReport } from '../controllers/reportController.js'

const router = express.Router()

router.post('/', (req, res) => {
  GetReport(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
