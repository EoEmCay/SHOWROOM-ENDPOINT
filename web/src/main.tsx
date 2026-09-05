import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './components/UserContext'
import { CarsProvider } from './components/CarsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CarsProvider>
        <App />
      </CarsProvider>
    </UserProvider>
  </React.StrictMode>,
)
