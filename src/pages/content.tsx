import { useState, useEffect } from "react";
import type { Food, SelectedFood } from "../types/food";
import Notification from "../components/notification";
import { foodList as foodDatabase } from "../data/foodlist";
import FoodSearch from "../components/food-search";
import DateSwitch from "../components/date-switch";
import Counter from "../components/counter";
import SelectedFoods from "../components/selected-foods";
import Footer from "../components/footer";
import { saveFoods, loadAllFoods } from "../data/food-tracker-db";
import party from "party-js";

export default function Content() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFoods, setSelectedFoods] = useState<{ [date: string]: SelectedFood[] }>({});
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [goals, setGoals] = useState({
    calories: 3000,
    fat: 75,
    protein: 150,
    carbs: 431,
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [confettiTriggered, setConfettiTriggered] = useState<boolean>(false);

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

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem("nutritionGoals");
    if (savedGoals) {
      console.log('Loaded goals from localStorage:', JSON.parse(savedGoals));
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    console.log('Saving goals to localStorage:', goals);
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
        console.log('Setting selectedFoods:', foodsByDate);
        setSelectedFoods(foodsByDate);
        // Ensure currentDate has an entry, even if empty
        if (!foodsByDate[currentDate]) {
          setSelectedFoods((prev) => ({ ...prev, [currentDate]: [] }));
        }
      })
      .catch((error: any) => {
        console.error("Error loading all foods:", error);
        setNotification("Failed to load food data");
      });
  }, []); // Run only on mount

  // Save foods to IndexedDB and check for calorie goal
  useEffect(() => {
    if (selectedFoods[currentDate]?.length >= 0) {
      saveFoods(currentDate, selectedFoods[currentDate] || []).catch((error: any) => {
        console.error("Error saving foods:", error);
        setNotification("Failed to save food data");
      });
    }

    // Check if calorie goal is surpassed and confetti hasn't been triggered
    if (totals.calories > goals.calories && !confettiTriggered) {
      const element: any = document.querySelector("#confetti");
      if (element) {
        party.confetti(element);
        setConfettiTriggered(true);
      }
    }
    // Reset confetti trigger if calories drop below goal
    if (totals.calories <= goals.calories && confettiTriggered) {
      setConfettiTriggered(false);
    }
  }, [selectedFoods, currentDate, totals.calories, goals.calories, confettiTriggered]);

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
      console.log(`Adding food ${food.name} for date ${currentDate}`);
      return { ...prev, [currentDate]: updatedFoods };
    });

    setSearchTerm("");
    setNotification(`${food.name} lagt til`);
  };

  const removeFood = (index: number) => {
    setSelectedFoods((prev) => {
      console.log(`Removing food at index ${index} for date ${currentDate}`);
      return {
        ...prev,
        [currentDate]: prev[currentDate].filter((_, i) => i !== index),
      };
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setSelectedFoods((prev) => {
      const currentFoods = prev[currentDate] || [];
      const updatedFoods = [...currentFoods];
      const newQuantity = updatedFoods[index].quantity + delta;
      if (newQuantity <= 0) {
        console.log(`Removing food at index ${index} due to quantity <= 0 for date ${currentDate}`);
        return {
          ...prev,
          [currentDate]: updatedFoods.filter((_, i) => i !== index),
        };
      }
      updatedFoods[index] = {
        ...updatedFoods[index],
        quantity: newQuantity,
      };
      console.log(`Updating quantity for food at index ${index} to ${newQuantity} for date ${currentDate}`);
      return { ...prev, [currentDate]: updatedFoods };
    });
    if (delta > 0) {
      setNotification(`${selectedFoods[currentDate][index].food.name} lagt til`);
    }
  };

  const changeDate = (days: number) => {
    if (days === 0) {
      const newDateStr = new Date().toISOString().split('T')[0];
      setCurrentDate(newDateStr);
      if (!selectedFoods[newDateStr]) {
        setSelectedFoods((prev) => ({ ...prev, [newDateStr]: [] }));
      }
      setConfettiTriggered(false);
      console.log(`Changed to today's date: ${newDateStr}`);
      return;
    }

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    const newDateStr = newDate.toISOString().split("T")[0];
    setCurrentDate(newDateStr);
    if (!selectedFoods[newDateStr]) {
      setSelectedFoods((prev) => ({ ...prev, [newDateStr]: [] }));
    }
    setConfettiTriggered(false);
    console.log(`Changed date to: ${newDateStr}`);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
      <Counter totals={totals} goals={goals} />

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