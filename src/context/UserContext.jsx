import { createContext, useEffect, useRef, useState } from 'react'
import { API_URL_USER } from '../consts'

const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([])
	const [userToEdit, setUserToEdit] = useState(null)
	const ref = useRef(null)

	useEffect(() => {
		if (ref.current === users) return

		fetch(API_URL_USER, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				ref.current = data
				setUsers(data)
			})
			.catch(err => console.log(err))
	}, [users])

	const createUser = user => {
		fetch(API_URL_USER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then(res => {
				res.ok ? setUsers(users) : alert('Error al crear el usuario')
			})
			.catch(err => console.log(err))
	}

	const updateUser = user => {
		fetch(`${API_URL_USER}/${user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then(res => {
				if (!res.ok) throw new Error('Error al actualizar el usuario')

				return res.json()
			})
			.then(data => {
				setUsers(data)
			})
			.catch(err => console.log(err))
	}

	const deleteUser = id => {
		const confirmDelete = confirm('¿Estas seguro de eliminar el usuario?')
		if (!confirmDelete) return

		fetch(`${API_URL_USER}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				if (!res.ok) throw new Error('Error al eliminar el usuario')
				return res.json()
			})
			.then(data => {
				setUsers(data)
			})
			.catch(err => console.log(err))
	}

	return (
		<UserContext.Provider
			value={{
				createUser,
				deleteUser,
				setUserToEdit,
				users,
				userToEdit,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export { UserProvider }

export default UserContext
