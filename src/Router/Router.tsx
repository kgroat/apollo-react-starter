
import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppDrawer from 'components/AppDrawer'
import AppBar from 'components/AppBar'

import { routeArray } from './routes'

interface Props {
  classes: Classes
}

interface Classes {
  root: string
  content: string
  padding: string
  toolbar: string
}

const styled = withStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
  },
  padding: {
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
}))

const Router = ({ classes }: Props) => {
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar />
        <AppDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {
              routeArray.map(({ path, component, key, exact = false, padding = true }) => {
                const route = (
                  <Route
                    key={key}
                    path={path}
                    component={component}
                    exact={exact}
                  />
                )
                return padding
                  ? <div key={`${key}_padding`} className={classes.padding}>{route}</div>
                  : route
              })
            }
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default styled(Router)
