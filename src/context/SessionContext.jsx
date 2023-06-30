import { createContext, useEffect, useState } from 'react'
import { API_URL } from '../consts'
import { navigate } from '../components/Link'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
	const [session, setSession] = useState({
		id: 3,
		name: 'jane',
		password: 'Ca234567',
		email: 'jane_67@gmail.com',
		balance: 10000,
		movements: [
			{
				date: '2021-08-01T00:00:00.000Z',
				amount: 1000,
				description: 'Salary',
				destination: 'John Doe',
			},
		],
	})
	const [error, setError] = useState(null)

	const [ip] = useState(
		Math.floor(Math.random() * 255) +
			Math.floor(Math.random() * 255) +
			Math.floor(Math.random() * 255) +
			Math.floor(Math.random() * 255)
	)

	useEffect(() => {
		fetch(`${API_URL}session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ip }),
		})
			.then(res => {
				if (res.status === 204) {
					// setSession(null)
					return
				}
				if (!res.ok) return

				return res.json()
			})
			.then(data => {
				if (!data) return

				const user = { name: data.name, id: data.id }

				setSession({ user })
			})
			.catch(err => console.log(err))
	}, [])

	const login = user => {
		fetch(`${API_URL}login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then(res => {
				if (res.status === 400) {
					setError('Usuario o contraseña incorrectos')
					return
				}

				if (!res.ok) throw new Error('Error al iniciar sesión')

				return res.json()
			})
			.then(data => {
				setSession(data)
				navigate('/')
			})
			.catch(err => console.log(err))
	}

	const logout = () => {
		localStorage.removeItem('session')

		fetch(`${API_URL}session`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ip }),
		})
			.then(res => {
				if (!res.ok) throw new Error('Error al cerrar sesión', res)

				setSession(null)
			})
			.catch(err => console.log(err))
	}

	return (
		<SessionContext.Provider value={{ session, login, logout, error }}>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext
