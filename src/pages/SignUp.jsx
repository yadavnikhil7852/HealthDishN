// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'user', // Default selection
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      // 1. Firebase Auth mein user register karo
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // 2. Firestore mein user ka role aur detail save karo
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role, // "user", "vendor", "admin", "delivery boy"
        createdAt: new Date()
      });

      alert("Welcome to HealthDish! Account created.");
      navigate("/"); // Home par bhej do
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50/50 py-10">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-green-100 w-full max-w-lg">
        <h2 className="text-3xl font-black text-green-900 text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['user', 'vendor', 'admin', 'delivery boy'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({...formData, role: r})}
                className={`py-2 px-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                  formData.role === r ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <input type="text" placeholder="Full Name" required 
            className="w-full p-3 rounded-xl border border-green-100 bg-green-50/50 focus:outline-green-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <input type="email" placeholder="Email" required 
            className="w-full p-3 rounded-xl border border-green-100 bg-green-50/50 focus:outline-green-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />

          <input type="text" placeholder="Mobile Number" required 
            className="w-full p-3 rounded-xl border border-green-100 bg-green-50/50 focus:outline-green-500"
            onChange={(e) => setFormData({...formData, mobile: e.target.value})} />

          <div className="grid grid-cols-2 gap-4">
            <input type="password" placeholder="Password" required 
              className="w-full p-3 rounded-xl border border-green-100 bg-green-50/50 focus:outline-green-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <input type="password" placeholder="Confirm" required 
              className="w-full p-3 rounded-xl border border-green-100 bg-green-50/50 focus:outline-green-500"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-700 transition-all mt-4">
            Register Now
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already a member? <Link to="/signin" className="text-green-700 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;