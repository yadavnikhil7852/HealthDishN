import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react'; // Lucide icons use kiye hain
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'; // Path check kar lena
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Agar user logged in hai toh data aayega, warna null
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

      {/* Middle: Searchbar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-green-600" />
          </div>
          <input
            type="text"
            placeholder="Search your healthy meal..."
            className="block w-full pl-10 pr-3 py-2 border border-green-100 rounded-full bg-green-50/30 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Side: Cart & Conditional Auth */}
      <div className="flex items-center gap-5">
        {/* Cart Icon */}
        <div 
          onClick={() => navigate('/cart')}
          className="relative cursor-pointer hover:scale-110 transition-transform p-2 hover:bg-green-50 rounded-full"
        >
          <ShoppingCart className="h-6 w-6 text-green-700" />
          <span className="absolute top-1 right-1 bg-green-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
            0
          </span>
        </div>

        {/* Conditional Rendering: User Profile or Sign In */}
        {user ? (
          <div className="flex items-center gap-3 ml-2">
            {/* Profile Logo (Green & White SVG) */}
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-green-700 transition-all active:scale-95 group"
              title="View Profile"
            >
              <User className="text-white w-6 h-6" />
            </button>

            {/* Logout Shortcut */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Sign In Button (User Logged out hai toh) */
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