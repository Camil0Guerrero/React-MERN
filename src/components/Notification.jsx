function Notification({ bgColor, color, children }) {
	const styles = {
		backgroundColor: bgColor ? bgColor : 'green',
		color: color ? color : 'white',
	}

	return (
		<div style={styles} className='notification'>
			<p>{children}</p>
		</div>
	)
}

export default Notification
