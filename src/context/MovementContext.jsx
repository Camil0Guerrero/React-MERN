import { createContext, useEffect, useRef, useState } from 'react'
import { API_URL_MOVEMENTS, API_URL_USER } from '../consts'
import fetchData from '../hooks/fetchData'
const MovementContext = createContext()

const MovementProvider = ({ children }) => {
	const [movements, setMovements] = useState([])
	const [userToEdit, setUserToEdit] = useState(null)
	const ref = useRef(null)

	useEffect(() => {
		if (ref.current === movements.length) return

		fetchData(API_URL_MOVEMENTS)
			.then(data => {
				if (data instanceof Error) {
					return
				}

				ref.current = data.length
				setMovements(data)
			})
			.catch(err => {
				console.error(err)
			})
	}, [movements])

	const createMovement = user => {
		fetchData(API_URL_USER, 'POST', user)
			.then(data => {
				setMovements([...movements, data])
			})
			.catch(err => {
				console.error(err)
			})
	}

	const updateUser = user => {
		fetchData(`${API_URL_USER}/${user.id}`, 'PUT', user)
			.then(data => {
				setMovements(data)
			})
			.catch(err => {
				console.error(err)
			})
	}

	const deleteUser = id => {
		const confirmDelete = confirm('¿Estas seguro de eliminar el usuario?')
		if (!confirmDelete) return

		fetchData(`${API_URL_USER}/${id}`, 'DELETE')
			.then(data => {
				setMovements(data)
			})
			.catch(err => {
				console.error(err)
			})
	}

	const sendMoney = (email, amount, description, type = 'transfer') => {
		const body = { email, amount, description, type }

		fetchData(`${API_URL_MOVEMENTS}transfer`, 'PUT', body)
			.then(data => {
				console.log(data)
			})
			.catch(err => {
				console.error(err)
			})
	}

	return (
		<MovementContext.Provider
			value={{
				createMovement,
				deleteUser,
				setUserToEdit,
				movements,
				userToEdit,
				updateUser,
				sendMoney,
			}}
		>
			{children}
		</MovementContext.Provider>
	)
}

export { MovementProvider }

export default MovementContext
