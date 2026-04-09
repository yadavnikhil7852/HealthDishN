import React, { useState } from 'react';
import { Search, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import AIAdvisor from '../components/AIAdvisor'; // AI Advisor import kiya

const menuData = [
  { id: 1, name: 'Quinoa Salad', category: 'Vegan', price: 320, calories: '320 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Grilled Chicken Breast', category: 'High Protein', price: 450, calories: '450 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'Avocado Toast', category: 'Breakfast', price: 300, calories: '280 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&auto=format&fit=crop' },
  { id: 4, name: 'Salmon Poke Bowl', category: 'Seafood', price: 650, calories: '520 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Vegan Buddha Bowl', category: 'Vegan', price: 380, calories: '380 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=300&auto=format&fit=crop' },
  { id: 6, name: 'Keto Steak', category: 'Keto', price: 700, calories: '650 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=300&auto=format&fit=crop' },
  { id: 7, name: 'Zucchini Noodles', category: 'Vegan', price: 310, calories: '180 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=300&auto=format&fit=crop' },
  { id: 8, name: 'Greek Yogurt Parfait', category: 'Breakfast', price: 340, calories: '240 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=300&auto=format&fit=crop' },
  { id: 9, name: 'Lentil Soup', category: 'Vegan', price: 300, calories: '210 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1547592116-359910d8f7f8?q=80&w=300&auto=format&fit=crop' },
  { id: 10, name: 'Turkey Wrap', category: 'High Protein', price: 420, calories: '390 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=300&auto=format&fit=crop' },

  { id: 11, name: 'Acai Bowl', price: 360, category: 'Vegan', calories: '310 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=300&auto=format&fit=crop' },
  { id: 12, name: 'Grilled Tofu Skewers', price: 330, category: 'Vegan', calories: '260 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1546069901-5ec6a7097f3b?q=80&w=300&auto=format&fit=crop' },
  { id: 13, name: 'Egg White Omelet', price: 310, category: 'Breakfast', calories: '220 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&auto=format&fit=crop' },
  { id: 14, name: 'Cauliflower Pizza', price: 520, category: 'Keto', calories: '420 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop' },
  { id: 15, name: 'Shrimp Tacos', price: 600, category: 'Seafood', calories: '380 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?q=80&w=300&auto=format&fit=crop' },

  { id: 16, name: 'Mushroom Risotto', price: 480, category: 'High Protein', calories: '410 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=300&auto=format&fit=crop' },
  { id: 17, name: 'Oatmeal with Fruits', price: 300, category: 'Breakfast', calories: '290 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=300&auto=format&fit=crop' },
  { id: 18, name: 'Beef Stir Fry', price: 680, category: 'High Protein', calories: '540 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1512058560366-c80b0426c6f4?q=80&w=300&auto=format&fit=crop' },
  { id: 19, name: 'Sweet Potato Fries', price: 300, category: 'Vegan', calories: '230 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1573082818143-bc201bd4d6ca?q=80&w=300&auto=format&fit=crop' },
  { id: 20, name: 'Chicken Caesar Salad', price: 490, category: 'High Protein', calories: '480 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=300&auto=format&fit=crop' },

  { id: 21, name: 'Baked Cod', price: 620, category: 'Seafood', calories: '310 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=300&auto=format&fit=crop' },
  { id: 22, name: 'Spiced Chickpeas', price: 300, category: 'Vegan', calories: '190 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=300&auto=format&fit=crop' },
  { id: 23, name: 'Berry Green Smoothie', price: 320, category: 'Vegan', calories: '150 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300&auto=format&fit=crop' },
  { id: 24, name: 'Pesto Pasta (Whole Wheat)', price: 510, category: 'High Protein', calories: '430 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=300&auto=format&fit=crop' },
  { id: 25, name: 'Tuna Salad Wrap', price: 470, category: 'Seafood', calories: '350 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=300&auto=format&fit=crop' },

  { id: 26, name: 'Edamame Beans', price: 300, category: 'Vegan', calories: '120 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1515466810232-026857640698?q=80&w=300&auto=format&fit=crop' },
  { id: 27, name: 'Stuffed Bell Peppers', price: 540, category: 'Keto', calories: '370 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=300&auto=format&fit=crop' },
  { id: 28, name: 'Chia Seed Pudding', price: 350, category: 'Breakfast', calories: '210 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=300&auto=format&fit=crop' },
  { id: 29, name: 'Broccoli Soup', price: 300, category: 'Vegan', calories: '160 kcal', type: 'veg', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=300&auto=format&fit=crop' },
  { id: 30, name: 'Grilled Sea Bass', price: 700, category: 'Seafood', calories: '340 kcal', type: 'non-veg', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc3a2?q=80&w=300&auto=format&fit=crop' }
];

const ExploreMenu = () => {
  const [filter, setFilter] = useState('All');
  
  // 1. Local searchTerm hata kar Context wala searchTerm nikalo
  const { addToCart, searchTerm, setSearchTerm } = useCart();

  const filteredDishes = menuData.filter(dish => {
    const matchesFilter = filter === 'All' || dish.type === filter || dish.category === filter;
    // Context wala searchTerm use ho raha hai
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 2. AI ADVISOR SECTION - ID de di smooth scroll ke liye */}
        <div id="ai-advisor" className="mb-16 scroll-mt-24">
           <AIAdvisor />
        </div>

        <h1 className="text-4xl font-black text-green-900 mb-8">Fuel Your Body 🥗</h1>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'veg', 'non-veg', 'Vegan', 'High Protein', 'Keto', 'Breakfast', 'Seafood'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === cat ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search dishes..."
              value={searchTerm} // Controlled by Context
              onChange={(e) => setSearchTerm(e.target.value)} // Context update
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-green-800 flex items-center gap-1 shadow-sm">
                  <Flame size={12} className="text-orange-500" /> {dish.calories}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight group-hover:text-green-700 transition-colors">{dish.name}</h3>
                  <div className={`w-3 h-3 mt-1.5 rounded-full border-2 ${dish.type === 'veg' ? 'bg-green-500 border-green-100' : 'bg-red-500 border-red-100'}`}></div>
                </div>
                <p className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">{dish.category}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xl font-black text-green-700">₹{dish.price}</span>
                  <button 
                    onClick={() => addToCart(dish)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md shadow-green-100 transition-all active:scale-95 hover:shadow-green-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">No dishes found matching your search. 🥗</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreMenu;