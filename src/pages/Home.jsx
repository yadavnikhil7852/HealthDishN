// src/pages/Home.jsx
import React from 'react';

// Mock data for food cards
const healthyFoods = [
  {
    id: 1,
    name: 'Quinoa Salad Bowl',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51_vDD0AibLYjV101hSrbx2uiSQzdN7Hmgg&s', // Realistic food images
    desc: 'With avocado, chickpeas & lemon dressing.',
    price: '$12.99',
  },
  {
    id: 2,
    name: 'Grilled Salmon Bowl',
    image: 'https://i0.wp.com/thesensitivefoodiekitchen.com/wp-content/uploads/2023/09/Buddha-bowl-pic.png?fit=675%2C675&ssl=1',
    desc: 'Served over brown rice with steamed veggies.',
    price: '$18.50',
  },
  {
    id: 3,
    name: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=300&auto=format&fit=crop',
    desc: 'Packed with antioxidants, granola & nuts.',
    price: '$9.75',
  },
  {
    id: 4,
    name: 'Mediterranean Wrap',
    image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?q=80&w=300&auto=format&fit=crop',
    desc: 'Hummus, feta, olives & fresh greens.',
    price: '$11.00',
  },
];

// Reusable Food Card Component
const FoodCard = ({ food }) => (
  <div className="bg-white rounded-3xl p-5 border border-green-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
    <img 
      src={food.image} 
      alt={food.name} 
      className="w-32 h-32 object-cover rounded-full border-4 border-yellow-200 shadow-inner mb-4" 
    />
    <h3 className="text-xl font-bold text-green-900 mb-1">{food.name}</h3>
    <p className="text-sm text-gray-600 flex-grow mb-3">{food.desc}</p>
    
    <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-gray-100">
      <span className="text-lg font-bold text-brown-800">{food.price}</span>
      <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-full font-semibold transition-colors">
        Add
      </button>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50/50 px-6 py-12 md:px-12 md:py-16">
      
      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid md:grid-cols-3 gap-12 items-start">
        
        {/* --- Left Side: Food Grid (2/3 width) --- */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-extrabold text-green-900 mb-10 tracking-tight">
            Our <span className="text-yellow-600">Fresh</span> Picks
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {healthyFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>

        {/* --- Right Side: Banner (1/3 width, Sticky) --- */}
        <div className="sticky top-24">
          <div className="bg-white p-10 rounded-3xl border-2 border-green-200 shadow-xl flex flex-col items-center text-center">
            
            {/* Yellow Decorative Icon */}
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-8 border-4 border-yellow-200">
              <span className="text-5xl">🥗</span>
            </div>
            
            <h1 className="text-4xl font-extrabold leading-tight text-green-950 mb-6">
              Wanna eat?<br />
              <span className="text-green-600">Choose <span className="text-brown-800">HealthDish</span>,</span>
            </h1>
            
            <p className="text-2xl font-semibold text-green-800 mb-10 tracking-tight">
              & Be Healthy.
            </p>
            
            <button className="w-full bg-brown-700 hover:bg-brown-800 text-amber-300 text-xl font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-3">
              Explore Our Menu <span className="text-2xl">➔</span>
            </button>
            
            <p className="text-xs text-gray-500 mt-6">
              Eat fresh, stay strong. HealthDish delivers nutrition at your doorstep.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;