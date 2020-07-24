import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { Button } from 'evergreen-ui'

import logo from './logo.svg'
import './App.css'

import {
  subscription,
  unsubscribe,
  register,
  setup,
} from 'services/push-notificatioins'
import KeyStore from 'services/subscription-storage'
import Header from 'components/header'

function App() {
  const { present, data } = useStore(subscription)

  useEffect(() => {
    if (KeyStore.hasKey) {
      const key = KeyStore.getKey()

      setup(key)
    }
  }, [])

  const handler = present ? unsubscribe : register

  console.log('App: ', data)

  return (
    <div className="App">
      <Header>
        <>
          <Button appearance="primary" onClick={handler}>
            {present ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </>
      </Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
