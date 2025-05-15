import { useState, useEffect } from "react";
import type { Food } from "../types/food";
import Notification from "./notification";
import { foodList as foodDatabase } from "../data/foodlist";
import FoodSearch from "./food-search";
import DateSwitch from "./date-switch";
import Counter from "./counter";
import SelectedFoods from "./selected-foods";
import Footer from "./footer";
import { saveFoods, loadAllFoods } from "../data/food-tracker-db";

interface SelectedFood {
  food: Food;
  quantity: number;
}

export default function Content() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<{ [date: string]: SelectedFood[] }>({});
  const [currentDate, setCurrentDate] = useState<string>("2025-05-14");
  const [isExploding, setIsExploding] = useState(false);
  const [goals, setGoals] = useState({
    calories: 3000,
    fat: 75,
    protein: 150,
    carbs: 431,
  });
  const [notification, setNotification] = useState<string | null>(null);

  // Calculate totals
  const totals = (selectedFoods[currentDate] || []).reduce(
    (acc, item: SelectedFood) => ({
      calories: acc.calories + item.food.calories * item.quantity,
      fat: acc.fat + item.food.fat * item.quantity,
      protein: acc.protein + item.food.protein * item.quantity,
      carbs: acc.carbs + item.food.carbs * item.quantity,
    }),
    { calories: 0, fat: 0, protein: 0, carbs: 0 }
  );

  // Trigger confetti when calories exceed goal
  useEffect(() => {
    if (totals.calories > goals.calories && !isExploding) {
      console.log("Calories exceeded goal, triggering confetti:", totals.calories, goals.calories);
      makeExplode();
    }
  }, [totals.calories, goals.calories]);

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem("nutritionGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem("nutritionGoals", JSON.stringify(goals));
  }, [goals]);

  // Load all foods from IndexedDB on component mount
  useEffect(() => {
    loadAllFoods()
      .then((allFoods) => {
        const foodsByDate = allFoods.reduce((acc, { date, selectedFoods }) => {
          acc[date] = selectedFoods;
          return acc;
        }, {} as { [date: string]: SelectedFood[] });
        setSelectedFoods({
          ...foodsByDate,
          [currentDate]: foodsByDate[currentDate] || [],
        });
      })
      .catch((error: any) => {
        console.error("Error loading all foods:", error);
        setNotification("Failed to load food data");
      });
  }, [currentDate]);

  // Save foods to IndexedDB whenever selectedFoods changes
  useEffect(() => {
    saveFoods(currentDate, selectedFoods[currentDate] || []).catch((error: any) => {
      console.error("Error saving foods:", error);
      setNotification("Failed to save food data");
    });
  }, [selectedFoods, currentDate]);

  const makeExplode = () => {
    console.log("Triggering confetti explosion");
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      console.log("Confetti explosion ended");
    }, 3000);
  };

  const filteredFoods = foodDatabase.filter((food: any) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFood = (food: Food) => {
    setSelectedFoods((prev) => {
      const currentFoods = prev[currentDate] || [];
      const existingFoodIndex = currentFoods.findIndex((item) => item.food.id === food.id);
      let updatedFoods;
      if (existingFoodIndex >= 0) {
        updatedFoods = [...currentFoods];
        updatedFoods[existingFoodIndex] = {
          ...updatedFoods[existingFoodIndex],
          quantity: updatedFoods[existingFoodIndex].quantity + 1,
        };
      } else {
        updatedFoods = [...currentFoods, { food, quantity: 1 }];
      }
      return { ...prev, [currentDate]: updatedFoods };
    });
    setNotification(`${food.name} lagt til`);
  };

  const removeFood = (index: number) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [currentDate]: prev[currentDate].filter((_, i) => i !== index),
    }));
  };

  const updateQuantity = (index: number, delta: number) => {
    setSelectedFoods((prev) => {
      const currentFoods = prev[currentDate] || [];
      const updatedFoods = [...currentFoods];
      const newQuantity = updatedFoods[index].quantity + delta;
      if (newQuantity <= 0) {
        return {
          ...prev,
          [currentDate]: updatedFoods.filter((_, i) => i !== index),
        };
      }
      updatedFoods[index] = {
        ...updatedFoods[index],
        quantity: newQuantity,
      };
      return { ...prev, [currentDate]: updatedFoods };
    });
    if (delta > 0) {
      setNotification(`${selectedFoods[currentDate][index].food.name} lagt til`);
    }
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

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
      <Counter totals={totals} goals={goals} isExploding={isExploding} />
      <DateSwitch currentDate={currentDate} changeDate={changeDate} />
      <FoodSearch
        searchTerm={searchTerm}
        filteredFoods={filteredFoods}
        addFood={addFood}
        setSearchTerm={setSearchTerm}
      />
      <SelectedFoods
        selectedFoods={selectedFoods}
        currentDate={currentDate}
        removeFood={removeFood}
        updateQuantity={updateQuantity}
      />
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}
      <Footer />
    </div>
  );
}