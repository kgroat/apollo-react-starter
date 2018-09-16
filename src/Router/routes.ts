
import { Home, HomeAppBar } from 'routes/Home'
import { Login } from 'routes/Login'

interface RouteDefinition {
  path: string
  component: React.ComponentType
  appBar?: React.ComponentType
  key?: string
  exact?: boolean
}

const routeDefs = {
  home: {
    path: '/',
    component: Home,
    appBar: HomeAppBar,
    exact: true,
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
