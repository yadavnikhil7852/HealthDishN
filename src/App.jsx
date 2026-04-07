import { useState } from 'react'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
 <Router>
      <Navbar /> {/* Navbar har page par dikhega */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
