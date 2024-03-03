import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@assets/css/default.css'
import '@assets/fonts/fonts.css'
import { BrowserRouter } from 'react-router-dom'

import ReactGA from 'react-ga4'
import { HelmetProvider } from 'react-helmet-async'

if (import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS) {
   ReactGA.initialize(import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS)
}
ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <HelmetProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </HelmetProvider>
   </React.StrictMode>,
)
