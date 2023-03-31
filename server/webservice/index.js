import express from 'express'
import cors from 'cors'
import router from './routers.js'

const corsOptions = {
  origin: true,
  credentials: true
}

const app = express()
const port = 3335

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use('/', router)

app.listen(port, () => console.info(`Server is up and running on port: ${port}`))
