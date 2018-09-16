
import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core'

interface Props {
  classes: Classes
}

interface Classes {
  menuButton: string
}

const styled = withStyles({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

const AppMenuIcon = ({ classes }: Props) => (
  <IconButton className={classes.menuButton} color='inherit' aria-label='Open drawer'>
    <MenuIcon />
  </IconButton>
)

export default styled(AppMenuIcon)
