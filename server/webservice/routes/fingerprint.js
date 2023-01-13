import express from 'express'
import { CredentialList } from '../controllers/fingerPrintController.js'

const router = express.Router()

router.post('/list', (_, res) => {
  CredentialList((response) => {
    res.status(response.status).json(response)
  })
})

export default router
