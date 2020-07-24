const express = require('express')
const webPush = require('web-push')

const router = express.Router()

const subscriptions = {}

router.get('/vapidPublicKey', function (req, res) {
  const data = { data: { key: process.env.VAPID_PUBLIC_KEY } }

  res.send(data)
})

router.post('/register', function (req, res) {
  var subscription = req.body.subscription

  if (!subscriptions[subscription.endpoint]) {
    console.log('Subscription registered ' + subscription.endpoint)
    subscriptions[subscription.endpoint] = subscription
  }
  res.sendStatus(201)
})

async function sendNotification(subscription) {
  try {
    await webPush.sendNotification(subscription)

    console.log(
      'Push Application Server - Notification sent to ' + subscription.endpoint
    )
  } catch (err) {
    console.log(err)
    console.log('ERROR in sending Notification: ' + subscription.endpoint)
  }
}

router.post('/sendNotification', function (req, res) {
  const { title, body } = req.body

  console.log('SUBS: ', subscriptions)

  Object.values(subscriptions).forEach(sendNotification)

  res.sendStatus(201)
})

router.post('/unregister', function (req, res) {
  var subscription = req.body.subscription

  if (subscriptions[subscription.endpoint]) {
    console.log('Subscription unregistered ' + subscription.endpoint)
    delete subscriptions[subscription.endpoint]
  }

  res.sendStatus(201)
})

module.exports = router
