import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ChatsPage from './pages/ChatsPage.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
function App() {
  return (
    
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route  path ='/chats' element ={<ChatsPage/> }/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
