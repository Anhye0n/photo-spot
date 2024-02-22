import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@assets/css/default.css'
import '@assets/fonts/fonts.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "@store/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

export let persist = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persist} loading={null}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </React.StrictMode>,
)