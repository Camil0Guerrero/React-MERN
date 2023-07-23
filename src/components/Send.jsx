import { useContext, useState } from 'react'
import SessionContext from '../context/SessionContext'
import MovementContext from '../context/MovementContext'
import { navigate } from './Link'
import Notification from './Notification'

function Send() {
	const { session } = useContext(SessionContext)
	const { sendMoney } = useContext(MovementContext)
	const [error, setError] = useState(null)

	if (!session) {
		navigate('/')
	}

	const handleSubmit = e => {
		e.preventDefault()
		const form = new FormData(e.target)

		const email = form.get('email'),
			amount = form.get('amount'),
			description = form.get('description')

		if (session.balance < 0 || session.balance < amount) {
			setError('Ups! ☹️ No tienes saldo suficiente')

			setTimeout(() => {
				setError(null)
			}, 3000)
			return
		}

		if (email === session.email) {
			setError('🤨 No puedes enviarte dinero a ti mismo')
			setTimeout(() => {
				setError(null)
			}, 4000)
			return
		}

		sendMoney(email, amount, description)
	}

	return (
		<>
			<h1>Send</h1>
			<span style={{ textAlign: 'right' }}>Tienes disponible: {session.balance}</span>

			<h3>A quien deseas enviar dinero?</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<input type='text' name='email' placeholder='Correo destino' />
				</label>
				<label>
					<input type='text' name='amount' placeholder='Ingresa la cantidad a enviar' />
				</label>

				<label>
					<textarea
						name='description'
						cols='30'
						rows='10'
						placeholder='Para que le envías el dinero?'
						style={{ resize: 'none' }}
					></textarea>
				</label>

				<input type='submit' value='Enviar' />
			</form>
			{error && <Notification bgColor='red'>{error}</Notification>}
		</>
	)
}

export default Send
