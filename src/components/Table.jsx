import TableRow from './TableRow'

function Table({ headers = [], data }) {
	return (
		<>
			<table>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						{Object.entries(data).map(([key, value]) => (
							<td key={key}>{value}</td>
						))}
					</tr> */}

					{data.length > 0 ? (
						data.map((item, index) => <TableRow key={index} item={item} />)
					) : (
						<tr>
							<td colSpan='3'>No hay Datos</td>
						</tr>
					)}
				</tbody>

				<tfoot>
					<tr>
						<th colSpan='3'>
							Created for{' '}
							<a
								href='https://twitter.com/cristian321893'
								target='_blank'
								rel='noreferrer'
							>
								Camilo Guerrero
							</a>
						</th>
					</tr>
				</tfoot>
			</table>
		</>
	)
}

export default Table
