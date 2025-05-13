import { useState } from "react";
import type { Food } from "../types/food";

const foodDatabase: Food[] = [
    { id: "asfcasv", name: "Apple", calories: 52, fat: 0.2, protein: 0.3, carbs: 14 },
    { id: "svasvbr", name: "Banana", calories: 89, fat: 0.3, protein: 1.1, carbs: 23 },
    { id: "asccace", name: "Chicken Breast", calories: 165, fat: 3.6, protein: 31, carbs: 0 },
    { id: "aoicnas", name: "Broccoli", calories: 35, fat: 0.4, protein: 2.8, carbs: 7 },
    { id: "ascoepl", name: "Salmon", calories: 208, fat: 13, protein: 20, carbs: 0 },
];

export default function Content() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
    const filteredFoods = foodDatabase.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const addFood = (food: Food) => {
      setSelectedFoods([...selectedFoods, food]);
    };
  
    const removeFood = (index: number) => {
      setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
    };
  
    const totals = selectedFoods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        fat: acc.fat + food.fat,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
      }),
      { calories: 0, fat: 0, protein: 0, carbs: 0 }
    );
  
    return (
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Calorie Tracker</h1>
        <input
          type="text"
          placeholder="Search foods..."
          className="w-full max-w-md p-2 mb-4 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Available Foods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {filteredFoods.map(food => (
              <button
                key={food.id}
                onClick={() => addFood(food)}
                className="p-2 bg-white dark:bg-gray-700 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                {food.name} ({food.calories} kcal)
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Totals</h2>
          <p className="text-gray-900 dark:text-white">Calories: {totals.calories} kcal</p>
          <p className="text-gray-900 dark:text-white">Fat: {totals.fat.toFixed(1)} g</p>
          <p className="text-gray-900 dark:text-white">Protein: {totals.protein.toFixed(1)} g</p>
          <p className="text-gray-900 dark:text-white">Carbs: {totals.carbs.toFixed(1)} g</p>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Selected Foods</h2>
        {selectedFoods.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No foods added yet.</p>
        ) : (
          <ul className="space-y-2">
            {selectedFoods.map((food, index) => (
              <li key={`${food.id}-${index}`} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded shadow text-gray-900 dark:text-white">
                <span>{food.name} - {food.calories} kcal (Fat: {food.fat}g, Protein: {food.protein}g, Carbs: {food.carbs}g)</span>
                <button
                  onClick={() => removeFood(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };