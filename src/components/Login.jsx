import { useContext, useState } from 'react'
import Link from './Link'
import validation from '../services/validations'
import SessionContext from '../context/SessionContext'

function Login() {
	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	const { login, error } = useContext(SessionContext)

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

		login(form)
	}

	return (
		<form autoComplete='on' onSubmit={handleSubmit}>
			<h2>Inicia sesión para empezar a navegar</h2>
			{error && (
				<p style={{ color: '#fff', backgroundColor: 'red' }}>{error}</p>
			)}
			<label>
				Email
				<input
					type='email'
					name='email'
					value={form.email}
					onChange={handleChange}
				/>
			</label>
			<label>
				Contraseña
				<input
					type='password'
					name='password'
					value={form.password}
					onChange={handleChange}
				/>
			</label>
			<button type='submit' onClick={handleSubmit}>
				Iniciar sesión
			</button>
			<Link to='forget-password'>Olvide la contraseña</Link>
			<Link to='register'>No tengo cuenta</Link>
		</form>
	)
}

export default Login
