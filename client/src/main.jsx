import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import { ContextProvider } from './context/context';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL,
axios.defaults.timeout = 15000,
axios.defaults.headers.common['Content-Type'] = "application/json";
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Toaster position='top-right' />
      <App />
    </ContextProvider>
  </React.StrictMode>,
)
