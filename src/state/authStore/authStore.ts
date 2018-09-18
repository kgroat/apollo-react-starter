
import { observable, computed, reaction } from 'mobx'
import { FetchResultError } from 'errors'
import graphqlClient from '../../graphqlClient'
import autoSave from '../autoSave'
import meQuery from './Me.graphql'
import loginMutation from './Login.graphql'
import { Me, Me_me } from './__generated__/Me'
import { Login, LoginVariables } from './__generated__/Login'

export interface AuthProp {
  auth?: AuthStore
}

class AuthStore {
  constructor () {
    reaction(
      () => this.jwt,
      () => this.fetchUser(),
    )
  }

  @observable jwt: string | null = null
  @observable user: Me_me | null = null
  @computed get loggedIn () {
    return !!this.user
  }

  async login (variables: LoginVariables) {
    const response = await graphqlClient.mutate({
      mutation: loginMutation,
      variables,
    })

    if (response.errors) {
      throw new FetchResultError('Login', response)
    }

    const { login: { token } } = response.data as Login
    this.jwt = token

    return this.fetchUser()
  }

  private async fetchUser () {
    if (!this.jwt) {
      this.user = null
      return null
    }

    const { errors, data } = await graphqlClient.query<Me>({
      query: meQuery,
    })

    if (errors) {
      this.user = null
    } else if (data && data.me) {
      this.user = data.me
    }

    return this.user
  }
}

export const auth = autoSave<AuthProp>('auth')(new AuthStore())
