import { createContext, useEffect, useState } from 'react'
import { API_URL, API_URL_USER } from '../consts'
import { navigate } from '../components/Link'
import fetchData from '../hooks/fetchData'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
	// El operador && hace que si el primer valor es falsy, se retorne el segundo valor
	const [session, setSession] = useState(JSON.parse(sessionStorage.getItem('user') && null))
	const [error, setError] = useState(null)

	// Si el usuario ha iniciado sesión anteriormente, obtenemos su información
	useEffect(() => {
		fetchData(API_URL_USER)
			.then(data => {
				if (data.error || data instanceof Error || data.message) {
					localStorage.removeItem('session')
					return
				}

				setSession(data)
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	const login = user => {
		fetchData(`${API_URL}login`, 'POST', user)
			.then(data => {
				if (data.error) {
					setError(data.error)
					return
				}

				localStorage.setItem('session', data.token)
				delete data.user.id
				sessionStorage.setItem('user', JSON.stringify(data.user))
				setSession(data.user)
				navigate('/')
			})
			.catch(err => {
				setError(err.message || 'Reviso tu conexión a internet')
			})
	}

	const logout = () => {
		localStorage.removeItem('session')
		sessionStorage.removeItem('user')
		setSession(null)
		navigate('/')
	}

	const data = {
		session,
		login,
		logout,
		error,
	}

	return <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
}

export default SessionContext
