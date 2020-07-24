require('dotenv').config()

const webPush = require('web-push')
const express = require('express')
const bodyParser = require('body-parser')

const PORT = 8049

const apiRouter = require('./api')

const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY ' +
      'environment variables. You can use the following ones:'
  )
  console.log(webPush.generateVAPIDKeys())
  return
}

app.use('/api', apiRouter)

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
)
