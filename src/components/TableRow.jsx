function TableRow({ item }) {
	if (item.date) {
		item.date = new Date(item.date).toUTCString().slice(5, 16)
	}

	const { amount, date, description, destination } = item

	return (
		<>
			<tr>
				<td>{date}</td>
				<td>{amount}</td>
				<td>{description}</td>
				<td>{destination}</td>
			</tr>
		</>
	)
}

export default TableRow
