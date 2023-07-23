import Link from './Link'
import SessionContext from '../context/SessionContext'
import { useContext } from 'react'
import './Header.css'

function Header() {
	const { session, logout } = useContext(SessionContext)

	const handleLogout = async e => {
		e.preventDefault()
		logout()
	}

	console.log(session)
	return (
		<header className='header'>
			{session ? <h2>Welcome {session.name}</h2> : <h2>Welcome</h2>}

			<nav className='menu'>
				<Link to='/'>Inicio</Link>
				<Link to='/movement'>Movimientos</Link>
				<Link to='/recharge'>Recargar</Link>
				<Link to='/send'>Enviar</Link>
			</nav>

			{session ? (
				<a to='/logout' className='session' onClick={handleLogout}>
					Cerrar sesión
				</a>
			) : (
				<Link to='/login' className='session'>
					Iniciar sesión
				</Link>
			)}
		</header>
	)
}

export default Header
