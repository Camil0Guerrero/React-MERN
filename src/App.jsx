import { appRoutes } from './consts'
import Header from './components/Header'
import Router from './Router'
import { SessionProvider } from './context/SessionContext'
import { Suspense } from 'react'

function App() {
	return (
		<>
			<SessionProvider>
				<Header />
				<main>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Router routes={appRoutes} />
					</Suspense>
				</main>
			</SessionProvider>
		</>
	)
}
export default App
