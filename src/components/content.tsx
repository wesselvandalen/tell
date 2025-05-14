import { useState, useEffect } from "react";
import type { Food } from "../types/food";
import Counter from "./counter";
import DateSwitch from "./date-switch";
// import GoalInput from "./goal-input";
import FoodSearch from "./food-search";
import SelectedFoods from "./selected-foods";
import { foodList as foodDatabase } from "../data/foodlist";

export default function Content() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<{ [date: string]: Food[] }>({
    "2025-05-14": [],
  });
  const [currentDate, setCurrentDate] = useState<string>("2025-05-14");
  const [goals, setGoals] = useState({
    calories: 3000,
    fat: 75,
    protein: 150,
    carbs: 431,
  });

  // Laster mål fra localStorage når komponenten lastes
  useEffect(() => {
    const savedGoals = localStorage.getItem("nutritionGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Lagrer mål til localStorage når de oppdateres
  useEffect(() => {
    localStorage.setItem("nutritionGoals", JSON.stringify(goals));
  }, [goals]);

  const filteredFoods = foodDatabase.filter((food: any) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFood = (food: Food) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [currentDate]: [...(prev[currentDate] || []), food],
    }));
  };

  const removeFood = (index: number) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [currentDate]: prev[currentDate].filter((_, i) => i !== index),
    }));
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    const newDateStr = newDate.toISOString().split("T")[0];
    setCurrentDate(newDateStr);
    if (!selectedFoods[newDateStr]) {
      setSelectedFoods((prev) => ({ ...prev, [newDateStr]: [] }));
    }
  };

  const totals = (selectedFoods[currentDate] || []).reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      fat: acc.fat + food.fat,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
    }),
    { calories: 0, fat: 0, protein: 0, carbs: 0 }
  );

  // const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setGoals((prev) => ({
  //     ...prev,
  //     [name]: parseFloat(value) || 0,
  //   }));
  // };

  return (
    <div className="flex-1 p-6 max-w-1g">

      {/* <GoalInput goals={goals} handleGoalChange={handleGoalChange} /> */}

      <Counter totals={totals} goals={goals} />

      <DateSwitch currentDate={currentDate} changeDate={changeDate} />

      <FoodSearch searchTerm={searchTerm} filteredFoods={filteredFoods} addFood={addFood} setSearchTerm={setSearchTerm} />

      <SelectedFoods selectedFoods={selectedFoods} currentDate={currentDate} removeFood={removeFood} />
      
    </div>
  );
}