import express from 'express'
import {
  GetScaleHistory,
  InsertMillYileds,
  UpdateMillYields
} from '../controllers/millYieldsController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertMillYileds(req, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/scale-in', (req, res) => {
  GetScaleHistory(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/update', (req, res) => {
  UpdateMillYields(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
