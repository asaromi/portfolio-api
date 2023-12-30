require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const {PORT = 3000, HOST = 'localhost'} = process.env
const app = express()

app.use((req, res, next) => {
  if (req.originalUrl.includes('/stripe/amazon-webhook')) {
    express.raw({type: 'application/json'})(req, res, next)
  } else {
    express.json()(req, res, next)
  }
})

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  return res.status(200).json({ status: 'OK', success: true, message: 'Welcome to global api service' })
})

app.use('/api/v1', require('./routers/v1'))

app.listen(PORT, HOST, () => {
  console.log(`global api service is listening on ${HOST}:${PORT}`)
})
