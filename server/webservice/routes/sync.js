import express from 'express'
import { SyncData } from '../controllers/syncController.js'

const router = express.Router()

router.post('/', (req, res) => {
  SyncData(req, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
