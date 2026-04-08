import { useState } from 'react'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ExploreMenu from './pages/ExploreMenu';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
 <Router>
      <Navbar /> {/* Navbar har page par dikhega */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/explore-menu" element={<ExploreMenu />} />
      </Routes>
    </Router>
  )
}

export default App
