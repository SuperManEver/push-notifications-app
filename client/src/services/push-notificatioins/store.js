import { isEmpty } from 'ramda'
import { createStoreObject } from 'effector'

import KeyStore from 'services/subscription-storage'
import { domain } from './domain'
import { unsubscribe, registrationFx, setup } from './effects'

export const SUBSCRIPTION_KEY = 'SUBSCRIPTION'

export const $subscription = domain.createStore({})

$subscription
  .on(setup, (_, val) => val)
  .on(registrationFx.done, (_, { result }) => result)
  .reset(unsubscribe)

export const hasSubscribed = $subscription.map((sub) => !isEmpty(sub))

export const subscription = createStoreObject({
  present: hasSubscribed,
  data: $subscription,
})

$subscription.watch((data) => {
  if (!isEmpty(data)) {
    KeyStore.add(data)
  }
})
