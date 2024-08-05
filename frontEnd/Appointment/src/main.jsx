import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppointmentContextProvider } from './Context/AppointmentContextProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AppointmentContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </AppointmentContextProvider>



)
