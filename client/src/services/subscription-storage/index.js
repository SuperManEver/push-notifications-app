import { isEmpty } from 'ramda'

const SUBSCRIPTION_KEY = 'SUBSCRIPTION'

export default class SubscriptionStorage {
  static add(val) {
    const strData = JSON.stringify(val, null, 2)
    window.localStorage.setItem(SUBSCRIPTION_KEY, strData)
  }

  static remove() {
    window.localStorage.removeItem(SUBSCRIPTION_KEY)
  }

  static getKey() {
    const key = window.localStorage.getItem(SUBSCRIPTION_KEY)

    return JSON.parse(key)
  }

  static hasKey() {
    const key = window.localStorage.getItem(SUBSCRIPTION_KEY)

    return isEmpty(key)
  }
}
