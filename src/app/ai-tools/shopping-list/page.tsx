"use client";

import React, { useState } from "react";
import { ShoppingBasket, Plus, Trash2, Check, CheckSquare, Square, Save, AlertCircle } from "lucide-react";

export default function ShoppingListPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Tomato", quantity: "5", category: "Produce", checked: false },
    { id: 2, name: "Onion", quantity: "2", category: "Produce", checked: false },
    { id: 3, name: "Garlic", quantity: "1 bulb", category: "Produce", checked: true },
    { id: 4, name: "Chicken Breast", quantity: "2 lbs", category: "Protein", checked: false },
    { id: 5, name: "Eggs", quantity: "1 dozen", category: "Dairy & Eggs", checked: false },
    { id: 6, name: "Milk", quantity: "1 gallon", category: "Dairy & Eggs", checked: false },
    { id: 7, name: "Rice", quantity: "2 cups", category: "Pantry", checked: false },
    { id: 8, name: "Olive Oil", quantity: "1 bottle", category: "Pantry", checked: true },
  ]);

  const [newItemName, setNewItemName] = useState("");

  const toggleCheck = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItemName,
        quantity: "1",
        category: "Other",
        checked: false
      }
    ]);
    setNewItemName("");
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.checked));
  };

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-3xl p-8 mb-8 border border-teal-100 dark:border-teal-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-teal-600/30 mx-auto md:mx-0">
            <ShoppingBasket size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Smart Shopping List</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Turn your recipes and meal plans into an organized shopping list automatically.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={clearCompleted} className="px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            Clear Completed
          </button>
          <button className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors">
            <Save size={16} /> Save List
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
        <form onSubmit={addItem} className="flex gap-3 mb-8">
          <input 
            type="text" 
            placeholder="Add a new item..." 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-grow px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Plus size={20} /> <span className="hidden sm:inline">Add Item</span>
          </button>
        </form>

        <div className="space-y-8">
          {categories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Your shopping list is empty. Add items above or import from recipes!
            </div>
          ) : (
            categories.map(category => {
              const catItems = items.filter(i => i.category === category);
              if (catItems.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                    {category} <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 font-semibold">{catItems.length}</span>
                  </h3>
                  <div className="space-y-2">
                    {catItems.map(item => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          item.checked 
                            ? 'bg-slate-50/50 dark:bg-slate-800/50 opacity-60' 
                            : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleCheck(item.id)}>
                          <button className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                            item.checked ? 'bg-teal-500 text-white' : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-teal-400'
                          }`}>
                            {item.checked && <Check size={16} strokeWidth={3} />}
                          </button>
                          <span className={`font-medium ${item.checked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                            {item.quantity}
                          </span>
                          <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-2xl text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-blue-100 dark:border-blue-800/30">
        <AlertCircle size={20} className="shrink-0" />
        <p className="font-medium">
          <strong>UI Prototype:</strong> This list currently uses mock data. In the full implementation, it will intelligently combine duplicate ingredients from your meal plans and recipes.
        </p>
      </div>
    </div>
  );
}
