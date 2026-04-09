import React, { useState } from 'react';
import { Sparkles, Activity, AlertCircle } from 'lucide-react';

const AIAdvisor = () => {
  const [formData, setFormData] = useState({ age: '', weight: '', disease: '', goal: 'Maintenance' });
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Healthy Dishes ki List (15-20 dishes)
  const healthyDishes = [
    "Quinoa Salad with Roasted Veggies 🥗",
    "Grilled Salmon with Steamed Broccoli 🐟",
    "Avocado Toast with Poached Egg 🥑",
    "Chickpea Curry with Brown Rice 🍛",
    "Moong Dal Chilla with Paneer Stuffing 🥞",
    "Greek Yogurt with Berries and Nuts 🍓",
    "Masala Oats with lots of Vegetables 🥣",
    "Baked Sweet Potato with Curd Dip 🍠",
    "Lentil Soup (Dal) with Spinach 🥣",
    "Tofu Stir-fry with Bell Peppers 🥦",
    "Chia Seed Pudding with Almond Milk 🥛",
    "Boiled Egg Salad with Black Pepper 🥚",
    "Sprouts Salad with Lemon and Ginger 🥗",
    "Grilled Chicken Breast with Quinoa 🍗",
    "Vegetable Dalia with Flax Seeds 🌾",
    "Smoothie Bowl with Spinach and Banana 🍌",
    "Paneer Tikka with Mint Chutney 🧀",
    "Steamed Fish with Lemon Garlic Sauce 🍋",
    "Millet Khichdi with Ghee 🥘",
    "Ragi Dosa with Coconut Chutney 🥥"
  ];

  const getAIPersonalization = async () => {
    if (!formData.age || !formData.disease) {
      alert("Age aur disease daalo");
      return;
    }

    setLoading(true);
    setSuggestion("");

    // 2. Random Dish select karne ka function
    const getRandomDish = () => {
      const randomIndex = Math.floor(Math.random() * healthyDishes.length);
      return healthyDishes[randomIndex];
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCqPEmIXUhwwMYB1In3nXg3h1WDTL6FHXE",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Age: ${formData.age}, Disease: ${formData.disease}. Suggest 2 healthy dishes and 1 tip. Keep it under 30 words.`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // 3. Agar AI se text aaya toh wo dikhao, nahi toh Random Dish
      if (aiText) {
        setSuggestion(aiText);
      } else {
        setSuggestion(` ${getRandomDish()} & ${getRandomDish()}!`);
      }

    } catch (err) {
      console.log(err);
      // Catch mein bhi random dish dikha denge
      setSuggestion(`Try this healthy meal: ${getRandomDish()}`);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-[3rem] p-8 text-white shadow-2xl border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-yellow-400" />
        <h2 className="text-2xl font-black italic uppercase tracking-tighter">HealthAI Advisor</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <input 
            type="number" placeholder="Enter Age" 
            className="w-full bg-white/5 p-4 rounded-2xl outline-none border border-white/10 focus:border-green-500 transition-all text-white"
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
          <input 
            type="text" placeholder="Disease (e.g. None, BP)" 
            className="w-full bg-white/5 p-4 rounded-2xl outline-none border border-white/10 focus:border-green-500 transition-all text-white"
            onChange={(e) => setFormData({...formData, disease: e.target.value})}
          />
          <button 
            onClick={getAIPersonalization}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-900/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "AI is thinking..." : "Get AI Advice"}
          </button>
        </div>
        
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex items-center justify-center text-center min-h-[150px]">
          {suggestion ? (
            <p className="text-green-100 font-medium leading-relaxed animate-in fade-in duration-500">{suggestion}</p>
          ) : (
            <p className="text-white/20 italic text-sm">Fill details to see AI magic...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;