import { useState } from 'react'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ExploreMenu from './pages/ExploreMenu';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Dummy Components (Bhai, ye pages tum baad mein banaoge, abhi routing check karne ke liye hain)
const AdminDashboard = () => <div className="p-20 text-center text-2xl font-bold">Admin Panel: Control Everything 👑</div>;
const VendorDashboard = () => <div className="p-20 text-center text-2xl font-bold">Vendor Panel: Manage Your Dishes 🥗</div>;
const DeliveryPanel = () => <div className="p-20 text-center text-2xl font-bold">Delivery Boy: New Orders List 🚴‍♂️</div>;

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/explore-menu" element={<ExploreMenu />} />
          <Route path="/cart" element={<Cart />} />

          {/* Role-Based Routes (Ye tabhi dikhenge jab Login logic se navigate honge) */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/delivery-panel" element={<DeliveryPanel />} />

          {/* Catch-all: Agar koi galat URL dale toh Home pe bhej do */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App;