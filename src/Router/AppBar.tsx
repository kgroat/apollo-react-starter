
import * as React from 'react'
import { BrowserRouter, RouteComponentProps, Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import RouteWith from './layouts/RouteWith'
import AuthIcon from '../components/AuthIcon/AuthIcon'
import MenuIcon from 'components/MenuIcon/MenuIcon'

import { routeArray } from './routes'

export interface RouteProps extends RouteComponentProps {
  menuIcon: React.ReactNode
  authIcon: React.ReactNode
}

interface Classes {
  title: string
}

const styled = withStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

const DefaultAppBarContent = styled(({ menuIcon, authIcon, classes }: RouteProps & { classes: Classes }) => (
  <Toolbar>
    {menuIcon}
    <Typography className={classes.title} variant='title' color='inherit' noWrap>
      Apollo React Starter
    </Typography>
    {authIcon}
  </Toolbar>
))

const Router = () => {
  const menuIcon = <MenuIcon />
  const authIcon = <AuthIcon />
  const additionalProps = {
    menuIcon,
    authIcon,
  }

  return (
    <AppBar position='static'>
      <BrowserRouter>
        <Switch>
        {
          routeArray.filter(route => route.appBar).map(({ path, appBar, key, exact = false }) => (
            <RouteWith
              key={key}
              path={path}
              component={appBar!}
              additionalProps={additionalProps}
              exact={exact}
            />
          ))
        }
          <RouteWith path='*' component={DefaultAppBarContent} additionalProps={additionalProps} />
        </Switch>
      </BrowserRouter>
    </AppBar>
  )
}

export default styled(Router)
