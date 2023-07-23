import validation from '../services/validations'
import { API_URL } from '../consts'
import { useState } from 'react'
import Notification from './Notification'

function TransferForm() {
	const [form, setForm] = useState({
		email: '',
		amount: '',
	})
	const [code, setCode] = useState(null)
	const [error, setError] = useState(null)

	const handleSubmit = e => {
		e.preventDefault()

		const validate = validation(form)
		if (validate) {
			return
		}

		const codeEmail = Math.floor(Math.random() * 1000000)
		setCode(codeEmail)

		const bodyEmail = {
			descripción: 'Gracias por probar mi proyecto 🤭, tu código es:',
			Código: codeEmail,
		}

		fetch(`https://formsubmit.co/ajax/${form.email}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyEmail),
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Error al enviar el correo', res)
				}

				return res.json()
			})
			.then(json => {
				if (json.success === 'false') {
					setError('Necesitamos tu aprobación, revisa tu correo')
				}
			})
			.catch(err => {
				console.log(err)
				setError(err.message)
			})
	}

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleClick = e => {
		e.preventDefault()

		console.log(form.code)
		console.log(+e.target.value === code)

		if (+form.code === code) {
			fetch(API_URL + 'movements', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					amount: +form.amount,
					type: 'recharge',
					email: form.email,
				}),
			})
				.then(res => console.log(res))
				.catch(err => console.log(err))
		}
	}

	return (
		<>
			<form>
				<h2>Recarga saldo</h2>
				<label>
					Email
					<input type='email' name='email' onChange={handleChange} value={form.email} />
				</label>

				<label>
					Monto
					<input type='number' onChange={handleChange} name='amount' value={form.amount} />
				</label>

				<button type='submit' onSubmit={handleSubmit} onClick={handleSubmit}>
					Recargar
				</button>

				<input type='hidden' name='_captcha' value='false'></input>
			</form>

			<p>Te llegara un código al correo para simular la recarga</p>

			{code && <input type='text' name='code' value={form.code} onChange={handleChange} />}

			{code && <button onClick={handleClick}>Validar</button>}

			{error && <Notification bgColor='red'>{error}</Notification>}
		</>
	)
}

export default TransferForm
