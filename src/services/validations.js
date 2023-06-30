const validateName = name => {
	const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,30}$/
	return regExp.test(name)
}

const validateEmail = email => {
	const regExp = /^[a-zA-Z0-9_.+-]+@(gmail|hotmail|outlook)+\.(com|es)$/
	return regExp.test(email)
}

const validatePassword = password => {
	const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

	return regExp.test(password)
}

const validateBalance = balance => {
	const balanceNumber = Number(balance)
	if (!balanceNumber) return false
	if (balanceNumber < 1000) return false

	const regExp = /^([0-9]{1,5})$/
	return regExp.test(balance)
}

const validation = user => {
	let errors = {}

	if (user.name) {
		const name = user.name.trim()
		validateName(name) ? null : (errors.name = 'El nombre es incorrecto')
	}

	if (user.email) {
		validateEmail(user.email)
			? null
			: (errors.email =
					'El email es incorrecto. Solo aceptamos gmail, hotmail y outlook')
	}

	if (user.password) {
		validatePassword(user.password)
			? null
			: (errors.password =
					'La contraseña debe tener una mayúscula, una minúscula y mínimo 8 caracteres')
	}

	if (user.balance) {
		validateBalance(user.balance)
			? null
			: (errors.balance = 'El saldo máximo para iniciar es de 100.000 COP')
	}

	if (errors.name || errors.email || errors.password || errors.balance) {
		return errors
	} else {
		return false
	}
}

export default validation
