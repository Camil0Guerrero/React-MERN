import { lazy } from 'react'

const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/Login'))
const Movements = lazy(() => import('./components/Movements'))
const Recharge = lazy(() => import('./components/Transfer'))
const Send = lazy(() => import('./components/Send'))

export const API_URL = 'http://localhost:8081/api/'

export const API_URL_USER = API_URL + 'users/'

export const API_URL_MOVEMENTS = API_URL + 'movements/'

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
	{
		path: '/recharge',
		Component: Recharge,
	},
	{
		path: '/send',
		Component: Send,
	},
]
