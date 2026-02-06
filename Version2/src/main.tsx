import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import reportWebVitals, { sendToAnalytics } from './shared/reportWebVitals'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

reportWebVitals(sendToAnalytics)
