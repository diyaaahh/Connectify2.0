import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router}from 'react-router-dom'
import ChatProvider from '../context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <ChatProvider>
    <App/>
  </ChatProvider>
  </Router>
)
