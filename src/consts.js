import { lazy } from 'react'

const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/Login'))
const Movements = lazy(() => import('./components/Movements'))

export const API_URL = 'http://localhost:8081/'

export const API_URL_USER = API_URL + 'api/users/'

export const EVENTS = {
	PUSHSTATE: 'pushstate',
	POPSTATE: 'popstate',
}

export const appRoutes = [
	{
		path: '/',
		Component: Home,
	},
	{
		path: '/login',
		Component: Login,
	},
	{
		path: '/movement',
		Component: Movements,
	},
]
