
import * as React from 'react'
import { Provider } from 'mobx-react'
import {
  AuthProp,
  default as auth,
} from './authStore/authStore'

interface Props {
  children?: React.ReactNode,
}

type ProviderProps = AuthProp

const stores: ProviderProps = {
  auth,
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
