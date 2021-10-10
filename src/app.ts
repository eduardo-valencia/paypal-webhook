import express from 'express'

import paypalRouter from './routes/webhook'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(paypalRouter)

export default app
