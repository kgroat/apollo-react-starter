
import * as React from 'react'
import { RouteComponentProps, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import RouteWith from 'Router/layouts/RouteWith'
import AuthIcon from 'components/AuthIcon'
import MenuIcon from 'components/MenuIcon'

import { routeArray } from 'Router/routes'

export interface RouteProps extends RouteComponentProps {
  menuIcon: React.ReactNode
  authIcon: React.ReactNode
}

interface DefaultContentProps extends RouteProps {
  classes: {
    title: string,
  }
}

const defaultContentStyled = withStyles(theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

const DefaultAppBarContent = defaultContentStyled(({ menuIcon, authIcon, classes }: DefaultContentProps) => (
  <Toolbar>
    {menuIcon}
    <Typography className={classes.title} variant='title' color='inherit' noWrap>
      Apollo React Starter
    </Typography>
    {authIcon}
  </Toolbar>
))

interface Props {
  classes: Classes
}

interface Classes {
  appBar: string
}

const styled = withStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

const Router = ({ classes }: Props) => {
  const menuIcon = <MenuIcon />
  const authIcon = <AuthIcon />
  const additionalProps = {
    menuIcon,
    authIcon,
  }

  return (
    <AppBar position='absolute' className={classes.appBar}>
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
    </AppBar>
  )
}

export default styled(Router)
