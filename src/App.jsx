import { useState } from 'react'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ExploreMenu from './pages/ExploreMenu';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
 <Router>
  <CartProvider>
      <Navbar /> {/* Navbar har page par dikhega */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/explore-menu" element={<ExploreMenu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  </CartProvider>
    </Router>
  )
}

export default App
