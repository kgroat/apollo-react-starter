
import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LockIcon from '@material-ui/icons/Lock'
import { DrawerProp } from 'state/drawerStore'

interface BaseProps {
}

interface Props extends BaseProps, DrawerProp, RouteComponentProps {
  classes: Classes
}

interface Classes {
  drawerPaper: string
  toolbar: string
  content: string
}

const drawerWidth = 300

const styled = withStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    height: '100vh',
  },
  toolbar: theme.mixins.toolbar,
}))

@inject('drawer')
@observer
class AppDrawer extends React.Component<Props> {
  render () {
    return (
      <React.Fragment>
        <Hidden smDown implementation='css'>
          {this.renderDesktopDrawer()}
        </Hidden>
        <Hidden mdUp>
          {this.renderMobileDrawer()}
        </Hidden>
      </React.Fragment>
    )
  }

  private renderDesktopDrawer () {
    const { classes } = this.props

    return (
      <Drawer
        variant='permanent'
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {this.renderContent()}
        </div>
      </Drawer>
    )
  }

  private renderMobileDrawer () {
    const { classes, drawer } = this.props

    return (
      <Drawer
        variant='temporary'
        anchor='left'
        open={drawer!.drawerOpen}
        onClose={() => drawer!.toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {this.renderContent()}
      </Drawer>
    )
  }

  private renderContent () {
    const { history } = this.props

    return (
      <React.Fragment>
        <ListItem button onClick={() => history.push('/login')}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary='Login' />
        </ListItem>
      </React.Fragment>
    )
  }
}

export default styled(withRouter(AppDrawer))
