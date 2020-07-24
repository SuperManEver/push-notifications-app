/* eslint-disable no-restricted-globals */

var version = 1

self.addEventListener('install', onInstall)
self.addEventListener('activate', onActivate)

function onInstall(evt) {
  console.log(`Service Worker (v${version}) installed`)
  self.skipWaiting()
}

function onActivate() {
  console.log('on active')
}

self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: 'Push Notification Subscription Management',
    })
  )
})

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('Subscription expired')
  event.waitUntil(
    self.registration.pushManager
      .subscribe({ userVisibleOnly: true })
      .then(function (subscription) {
        console.log('Subscribed after expiration', subscription.endpoint)
        return fetch('register', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        })
      })
  )
})
