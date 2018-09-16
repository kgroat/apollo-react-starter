
import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { routeArray } from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {
          routeArray.map(({ path, component, key, exact = false }) => (
            <Route
              key={key}
              path={path}
              component={component}
              exact={exact}
            />
          ))
        }
      </Switch>
    </BrowserRouter>
  )
}

export default Router
