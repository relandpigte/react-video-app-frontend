import React from 'react'
import ReactDOM from 'react-dom/client'

import logger from './services/logService'
import App from './App'

logger.init()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
