import React from 'react';
import { useCart } from '../context/CartContext';
// import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Trash2, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, setCartItems } = useCart();
  const navigate = useNavigate();

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const total = subtotal + deliveryFee;

  // Quantity control functions
 const updateQuantity = (item, action) => {
  if (action === 'inc') {
    addToCart(item);
  } else if (action === 'dec') {
    if (item.quantity > 1) {
      // Quantity kam karne ka logic
      const updatedItems = cartItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      );
      // Context mein setCartItems export hona chahiye, 
      // agar nahi hai toh context file mein setCartItems ko value mein add kar dena.
    } else {
      removeFromCart(item.id); // 1 se kam ho toh delete kar do
    }
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-green-300" />
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any healthy dishes yet.</p>
        <button 
          onClick={() => navigate('/explore-menu')}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition-all"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50/30 py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-green-900 mb-10">Your Healthy Cart 🛒</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items List (Left Side) */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] p-4 flex items-center gap-6 shadow-sm border border-green-100">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl shadow-inner" />
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-green-950">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 capitalize">{item.category || 'Healthy Food'}</p>
                  <p className="font-black text-green-700">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-green-50 rounded-xl p-1 border border-green-100">
                  <button onClick={() => updateQuantity(item, 'dec')} className="p-2 hover:bg-white rounded-lg transition-all text-green-700">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-green-900">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, 'inc')} className="p-2 hover:bg-white rounded-lg transition-all text-green-700">
                    <Plus size={16} />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-3 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Bill Summary (Right Side) */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-green-100 h-fit sticky top-28">
            <h2 className="text-xl font-bold text-green-900 mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-xl font-bold text-green-950">Total</span>
                <span className="text-xl font-black text-green-700">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="w-full bg-stone-900 hover:bg-black text-amber-300 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
            >
              <CreditCard size={20} /> Checkout Now
            </button>
            
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
              Secure Payment by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;