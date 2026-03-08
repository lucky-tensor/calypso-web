import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { WizardProvider } from './WizardContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WizardProvider>
            <App />
        </WizardProvider>
    </React.StrictMode>,
)

