import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, LogOut, Sparkles } from 'lucide-react'; // Sparkles icon AI ke liye
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { cartItems, setSearchTerm } = useCart(); // SearchTerm context se nikala

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // AI Advisor pe scroll karne ka logic
  const scrollToAI = () => {
    navigate('/explore-menu'); // Pehle menu page pe bhejo
    setTimeout(() => {
      const element = document.getElementById('ai-advisor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="bg-green-600 p-1.5 rounded-lg">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rotate-45"></div>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-green-700 tracking-tight">HealthDish</span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Fresh & Nutritious</span>
        </div>
      </Link>

      {/* Middle: Searchbar (Functional) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-green-600" />
          </div>
          <input
            type="text"
            placeholder="Search your healthy meal..."
            onChange={(e) => setSearchTerm(e.target.value)} // Context ki state update hogi
            onFocus={() => navigate('/explore-menu')} // Focus karte hi menu page pe le jao
            className="block w-full pl-10 pr-3 py-2 border border-green-100 rounded-full bg-green-50/30 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Side: AI, Cart & Auth */}
      <div className="flex items-center gap-4">
        
        {/* NEW: HealthAI Button */}
        <button 
          onClick={scrollToAI}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-green-100 hover:scale-105 transition-all active:scale-95"
        >
          <Sparkles size={14} className="text-yellow-300" />
          <span className="hidden sm:inline">HealthAI</span>
        </button>

        {/* Cart Icon */}
        <div 
          onClick={() => navigate('/cart')}
          className="relative cursor-pointer hover:scale-110 transition-transform p-2 hover:bg-green-50 rounded-full"
        >
          <ShoppingCart className="h-6 w-6 text-green-700" />
          {cartItems.length > 0 && (
            <span className="absolute top-1 right-1 bg-green-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
              {cartItems.length}
            </span>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-3 ml-2">
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-green-700 transition-all active:scale-95 group"
            >
              <User className="text-white w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className="bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;