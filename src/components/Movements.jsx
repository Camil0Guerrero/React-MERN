import { useContext } from 'react'
import Table from './Table'
import SessionContext from '../context/SessionContext'
import MovementContext from '../context/MovementContext'
import { navigate } from './Link'

function Movements() {
	const { session } = useContext(SessionContext)
	const { movements } = useContext(MovementContext)
	if (!session) return navigate('/login')

	return (
		<>
			<h2>Tus últimos 50 movimientos</h2>

			{<Table data={movements ?? []} />}
		</>
	)
}

export default Movements
