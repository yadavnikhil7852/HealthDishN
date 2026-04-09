import React, { useState } from 'react';
import { Sparkles, Activity, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIAdvisor = () => {
  const [formData, setFormData] = useState({ age: '', weight: '', disease: '', goal: 'Maintenance' });
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. API Key wahi rakho
  const genAI = new GoogleGenerativeAI("AIzaSyCqPEmIXUhwwMYB1In3nXg3h1WDTL6FHXE");

const getAIPersonalization = async () => {
  if (!formData.age || !formData.disease) {
    alert("Age aur disease daalo");
    return;
  }

  setLoading(true);
  setSuggestion("");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCqPEmIXUhwwMYB1In3nXg3h1WDTL6FHXE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Age: ${formData.age}
Disease: ${formData.disease}

Suggest 2 healthy dishes and 1 tip.`
                }
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI response";

    setSuggestion(text);
  } catch (err) {
    console.log(err);
    setSuggestion("AI error");
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
        
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex items-center justify-center text-center">
          {suggestion ? (
            <p className="text-green-100 font-medium leading-relaxed">{suggestion}</p>
          ) : (
            <p className="text-white/20 italic text-sm">Fill details to see AI magic...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;