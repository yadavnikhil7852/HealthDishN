import React from 'react';
import { ShoppingCart, Search } from 'lucide-react'; // Icons ke liye lucide-react ka use kiya hai
import { useNavigate, Link} from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="bg-green-600 p-1.5 rounded-lg">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rotate-45"></div>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-green-700 tracking-tight">HealthDish</span>
          <span className="text-[10px] text-gray-500 font-medium">Fresh & Nutritious</span>
        </div>
      </Link>

      {/* Middle: Rounded Searchbar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-green-600" />
          </div>
          <input
            type="text"
            placeholder="Search your healthy meal..."
            className="block w-full pl-10 pr-3 py-2 border border-green-200 rounded-full bg-green-50/30 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right Side: Cart & Sign In */}
      <div className="flex items-center gap-6">
        {/* Cart SVG/Icon */}
        <div className="relative cursor-pointer hover:scale-105 transition-transform">
          <ShoppingCart className="h-6 w-6 text-green-700" />
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            0
          </span>
        </div>

        {/* Sign In Button */}
        <button
        onClick={()=>navigate('/signin')}
         className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors shadow-md active:scale-95">
          Sign In
        </button>
      </div>

    </nav>
  );
};

export default Navbar;