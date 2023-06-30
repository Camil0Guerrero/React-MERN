import { useContext } from 'react'
import UserContext from '../context/UserContext'

function TableRow({ item, operations = false }) {
	const { setUserToEdit, deleteUser } = useContext(UserContext)

	console.log(item)

	if (item.date) {
		item.date = new Date(item.date).toUTCString().slice(5, 16)
	}

	return (
		<>
			<tr>
				{Object.entries(item).map(([key, value]) => (
					<td key={key}>{value}</td>
				))}

				{operations && (
					<td>
						<button onClick={() => setUserToEdit(item)}>Editar</button>
						<button onClick={() => deleteUser(item.id)}>Eliminar</button>
					</td>
				)}
			</tr>
		</>
	)
}

export default TableRow
