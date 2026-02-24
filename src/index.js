import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

if (!Array.prototype.toReversed) {
	// eslint-disable-next-line no-extend-native
	Array.prototype.toReversed = function () {
		return Array.from(this).reverse()
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

reportWebVitals()
