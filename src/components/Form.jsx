import { useContext, useEffect, useState } from 'react'
import validation from '../services/validations'
import UserContext from '../context/UserContext'

const initialForm = {
	name: '',
	email: '',
	password: '',
	balance: 0,
}

function Form() {
	const [form, setForm] = useState(initialForm)
	const { createUser, updateUser, userToEdit } = useContext(UserContext)

	useEffect(() => {
		if (userToEdit) setForm(userToEdit)
		else setForm(initialForm)
	}, [userToEdit])

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		const validate = validation(form)

		if (validate) {
			console.log(validate)
			return
		}

		if (!form.id) {
			createUser(form)
		} else {
			updateUser(form)
		}

		setForm(initialForm)
	}

	return (
		<>
			<h2>{userToEdit ? 'Editar usuario' : 'Agregar usuario'}</h2>

			<form autoComplete='off' onSubmit={handleSubmit}>
				<label>
					Nombre:
					<input
						name='name'
						pattern='^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,30}$'
						placeholder='¿Cual es tu nombre?'
						title='Ingresa preferiblemente un nombre y un apellido'
						type='text'
						value={form.name}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Email:
					<input
						name='email'
						placeholder='Ingresa tu correo electrónico'
						title='Ingresa un correo de gmail, hotmail u outlook'
						type='email'
						value={form.email}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Contraseña:
					<input
						autoComplete='new-password'
						name='password'
						pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'
						placeholder='Crea una contraseña segura'
						title='Ingresa una contraseña con una mayúscula, una minúscula y mínimo 8 caracteres'
						type='password'
						value={form.password}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Saldo:
					<input
						type='number'
						name='balance'
						title='Ingresa el valor sin puntos ni comas, el máximo es 100.000 para la primera vez'
						placeholder='¿Ingresaras saldo?'
						pattern='^([0-9]{1,5})$'
						value={form.balance}
						onChange={handleChange}
					/>
				</label>
				<button type='submit'>Registrar</button>
			</form>
		</>
	)
}

export default Form
