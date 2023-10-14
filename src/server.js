require('dotenv').config()
const express = require('express')

const {PORT = 3000, HOST = 'localhost'} = process.env
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  return res.status(200).json({ status: 'OK', success: true, message: 'Welcome to global api service' })
})
app.use('/api', require('./routers'))

app.listen(PORT, HOST, () => {
  console.log(`global api service is listening on ${HOST}:${PORT}`)
})
