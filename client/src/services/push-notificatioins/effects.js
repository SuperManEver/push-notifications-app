import { forward } from 'effector'

import KeyStore from 'services/subscription-storage'

import { urlBase64ToUint8Array } from './utils'
import { domain } from './domain'

export const setup = domain.createEvent('setup initial store state')
export const register = domain.createEvent(
  'registration for push notifications'
)
export const subscribe = domain.createEvent('subscribe to push notifications')
export const unsubscribe = domain.createEvent(
  'unsubscribe to push notifications'
)

export const registrationFx = domain.createEffect({
  async handler() {
    const registration = await navigator.serviceWorker.ready

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/vapidPublicKey`
    )
    const {
      data: { key: vapidPublicKey },
    } = await res.json()

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    })

    return subscription
  },
})

export const makeSubscriptionFx = domain.createEffect({
  async handler({ result }) {
    return fetch(process.env.REACT_APP_API_URL + '/api/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription: result,
      }),
    })
  },
})

const clearSubscriptionFx = domain.createEffect({
  async handler() {
    KeyStore.remove()
  },
})

forward({ from: register, to: registrationFx })
forward({ from: registrationFx.done, to: makeSubscriptionFx })
forward({ from: unsubscribe, to: clearSubscriptionFx })
