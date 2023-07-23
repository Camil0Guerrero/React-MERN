import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { MovementProvider } from './src/context/MovementContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<MovementProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</MovementProvider>
)
