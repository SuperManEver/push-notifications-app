import { subscribe, init } from './effects'
import { SUBSCRIPTION_KEY } from './store'

async function initServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return
  }

  await navigator.serviceWorker.register('/sw.js', {
    updateViaCache: 'none',
  })

  const registration = await navigator.serviceWorker.ready

  const subscription = await registration.pushManager.getSubscription()

  if (subscription) {
    subscribe(subscription)
  }
}

function run() {
  initServiceWorker()
}

run()

export * from './effects'
export * from './store'
