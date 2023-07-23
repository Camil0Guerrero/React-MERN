import { EVENTS } from './consts'
import { useEffect, useState } from 'react'
import { getCurrentPath } from './utils'

function Router({ routes = [], DefaultComponent: DefaultComponent = () => <h1>404</h1> }) {
	const [currentPath, setCurrentPath] = useState(getCurrentPath())

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(getCurrentPath())
		}

		window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)

		window.addEventListener(EVENTS.POPSTATE, onLocationChange)

		return () => {
			window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
			window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
		}
	}, [])

	let routeParams = {}

	const Page = routes.find(({ path }) => {
		if (path === currentPath) return true

		const isDynamic = path.includes(':')

		if (isDynamic) {
			const pathRegex = new RegExp(path.replace(/:[a-zA-Z]+/g, '([a-zA-Z0-9]+)'))

			const match = currentPath.match(pathRegex)

			if (match) {
				const [, ...values] = match

				routeParams = values.reduce((acc, value, index) => {
					const key = path.match(/:[a-zA-Z]+/g)[index].replace(':', '')

					acc[key] = value

					return acc
				}, {})
			}

			routeParams = match.input
			console.log(routeParams)
		}
	})?.Component

	return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}

export default Router
