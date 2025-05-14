import Dexie from 'dexie';
import type { Table } from 'dexie'; // Use type-only import for Table
import type { SelectedFood } from '../types/food'; // Adjust path to your types

// Define the database
class FoodTrackerDB extends Dexie {
  foods!: Table<{ date: string; selectedFoods: SelectedFood[] }>;

  constructor() {
    super('FoodTrackerDB');
    this.version(1).stores({
      foods: 'date', // 'date' is the primary key
    });
  }
}

const db = new FoodTrackerDB();

// Save selected foods for a specific date
export async function saveFoods(date: string, foods: SelectedFood[]): Promise<void> {
  await db.foods.put({ date, selectedFoods: foods });
}

// Load selected foods for a specific date
export async function loadFoods(date: string): Promise<SelectedFood[]> {
  const entry = await db.foods.get(date);
  return entry ? entry.selectedFoods : [];
}

// Load all foods from the database
export async function loadAllFoods(): Promise<{ date: string; selectedFoods: SelectedFood[] }[]> {
  return await db.foods.toArray();
}

// Clear all food data (optional, for debugging or reset)
export async function clearFoods(): Promise<void> {
  await db.foods.clear();
}