import * as React from 'react'
import {
  app,
  appHeader,
  appLogo,
  appTitle,
  appIntro,
} from './App.css'

import logo from '../logo.svg'

class App extends React.Component {
  public render () {
    return (
      <div className={app}>
        <header className={appHeader}>
          <img src={logo} className={appLogo} alt='logo' />
          <h1 className={appTitle}>Welcome to React</h1>
        </header>
        <p className={appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
