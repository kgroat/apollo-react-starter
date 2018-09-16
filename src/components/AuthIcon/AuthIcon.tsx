
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { AuthProp } from 'state/authStore/authStore'

interface BaseProps extends Partial<AuthProp> {
}

interface State {
  anchorEl: HTMLAnchorElement | null
}

type Props = BaseProps

@inject('auth')
@observer
class AuthIcon extends React.Component<Props, State> {
  state = {
    anchorEl: null,
  }

  handleMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { auth } = this.props
    const { anchorEl } = this.state

    if (!(auth!.loggedIn)) {
      return null
    }

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup='true'
          onClick={this.handleMenu}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default AuthIcon
