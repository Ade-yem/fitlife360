import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import { ContextProvider } from './context/context';


axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Toaster position='top-right' />
      <App />
    </ContextProvider>
  </React.StrictMode>,
)
