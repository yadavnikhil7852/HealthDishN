import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase'; // Apni firebase config file import karein
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Firebase Auth se login karein
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // 2. Firestore se user ka Role fetch karein
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        console.log("Logged in as:", role);

        // 3. Role-based Redirection
        if (role === 'vendor') {
          navigate("/vendor-dashboard");
        } else if (role === 'delivery boy') {
          navigate("/delivery-panel");
        } else if (role === 'admin') {
          navigate("/admin-panel");
        } else {
          navigate("/"); // Default Customer Home
        }
      } else {
        setError("User profile not found in database.");
      }
    } catch (err) {
      // Common Firebase Errors handle karein
      if (err.code === 'auth/user-not-found') setError("User nahi mila!");
      else if (err.code === 'auth/wrong-password') setError("Galat password!");
      else setError("Login fail: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl border border-green-100 w-full max-w-md">
        
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
           <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-200">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold">
                HD
              </div>
           </div>
        </div>

        <h1 className="text-3xl font-extrabold text-green-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">Eat healthy, stay wealthy! Log in to your dish.</p>
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1 ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-xl border border-green-100 bg-green-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1 ml-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-green-100 bg-green-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-green-700 hover:text-green-900 transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account? 
          <Link to="/signup" className="text-green-700 font-bold ml-1 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;