import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { SelectedFood } from '../types/food';

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
  try {
    await db.foods.put({ date, selectedFoods: foods });
  } catch (error) {
    console.error(`Error saving foods for date ${date}:`, error);
    throw error;
  }
}

// Load selected foods for a specific date
export async function loadFoods(date: string): Promise<SelectedFood[]> {
  try {
    const entry = await db.foods.get(date);
    return entry ? entry.selectedFoods : [];
  } catch (error) {
    console.error(`Error loading foods for date ${date}:`, error);
    throw error;
  }
}

// Load all foods from the database
export async function loadAllFoods(): Promise<{ date: string; selectedFoods: SelectedFood[] }[]> {
  try {
    const allFoods = await db.foods.toArray();
    return allFoods;
  } catch (error) {
    console.error('Error loading all foods:', error);
    throw error;
  }
}

// Clear all food data (for debugging or reset)
export async function clearFoods(): Promise<void> {
  try {
    await db.foods.clear();
  } catch (error) {
    console.error('Error clearing foods:', error);
    throw error;
  }
}