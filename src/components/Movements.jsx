import { useContext } from 'react'
import Table from './Table'
import SessionContext from '../context/SessionContext'
import { navigate } from './Link'

function Movements() {
	const { session } = useContext(SessionContext)

	console.log(session)

	if (!session) return navigate('/login')

	return (
		<>
			<h2>Tus últimos 50 movimientos</h2>

			{
				<Table
					headers={['Fecha', 'Monto', 'Descripción', 'Destino']}
					data={session.movements}
				/>
			}
		</>
	)
}

export default Movements
