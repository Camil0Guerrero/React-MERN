export async function fetchData(endpoint, method = 'GET', body) {
	try {
		const response = await fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('session')}`,
			},
			body: JSON.stringify(body),
		})

		if (!response.ok) {
			throw await response.json()
		}

		return await response.json()
	} catch (err) {
		return err
	}
}

export default fetchData
