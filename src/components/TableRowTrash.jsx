// Estaba pensando en practicar la edición de datos en tablas, sin embargo, creo que no es correcto que un usuario tenga la posibilidad de editarlos ya que esto podría generar problemas en el balance de la cuenta. Por lo tanto, decidí no implementar esta funcionalidad. Sin embargo, dejo el código para que se pueda ver cómo lo haría.
import { useContext, useState } from 'react'
import MovementContext from '../context/MovementContext'

function TableRowTrash({ item }) {
	const { deleteUser } = useContext(MovementContext)
	const [data, setData] = useState(null)
	const [newData, setNewData] = useState({})

	if (item.date) {
		item.date = new Date(item.date).toUTCString().slice(5, 16)
	}

	const { amount, date, description, destination } = item

	const handleDoubleClick = () => {
		setData(true)
	}

	const cancelOperation = () => {
		setData(null)
	}

	const handleChange = e => {
		setNewData({
			...newData,
			[e.target.name]: e.target.value,
		})
		console.log(newData)
	}

	return data ? (
		<tr>
			<td>{date}</td>
			<td>
				<input
					type='number'
					defaultValue={amount}
					name='amount'
					onChange={handleChange}
					value={newData.amount}
				/>
			</td>
			<td>
				<input
					type='text'
					defaultValue={description}
					name='description'
					onChange={handleChange}
					value={newData.description}
				/>
			</td>
			<td>
				<input
					type='text'
					defaultValue={destination}
					name='destination'
					onChange={handleChange}
					value={newData.destination}
				/>
			</td>
			<td style={{ textAlign: 'center' }}>
				<a onClick={cancelOperation}>
					<img src='/public/images/x.svg' alt='Cancel Operation' />
				</a>
				<a>
					<img src='/public/images/check-lg.svg' alt='Edit User' />
				</a>
			</td>
		</tr>
	) : (
		<>
			<tr onDoubleClick={handleDoubleClick}>
				<td>{date}</td>
				<td>{amount}</td>
				<td>{description}</td>
				<td>{destination}</td>

				<td style={{ textAlign: 'center' }}>
					<a onClick={() => setData(true)}>
						<img src='/public/images/pencil-square.svg' alt='Edit User' />
					</a>
					<a onClick={() => deleteUser(item._id)}>
						<img src='/public/images/trash-fill.svg' alt='Delete User' />
					</a>
				</td>
			</tr>
		</>
	)
}

export default TableRowTrash
