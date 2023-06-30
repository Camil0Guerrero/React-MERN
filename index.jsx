import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { UserProvider } from './src/context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</UserProvider>
)
