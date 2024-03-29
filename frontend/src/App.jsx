import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ChatsPage from './pages/ChatsPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chats' element={<ChatsPage />} />
    </Routes>

  );
}

export default App;
