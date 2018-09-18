
import { Home, HomeAppBar } from 'routes/Home'
import { Login } from 'routes/Login'

interface RouteDefinition {
  path: string
  component: React.ComponentType
  appBar?: React.ComponentType
  key?: string
  exact?: boolean
  padding?: boolean // default = true
}

const routeDefs = {
  home: {
    path: '/',
    component: Home,
    appBar: HomeAppBar,
    exact: true,
    padding: false,
  },
  login: {
    path: '/login',
    component: Login,
    exact: true,
  },
}

export const routes: { [key in keyof typeof routeDefs]: RouteDefinition } = routeDefs
export const routeArray = Object.keys(routes).map(key => {
  const route = routes[key] as RouteDefinition
  return {
    ...route,
    key,
  }
})
