export interface Food {
    id: number;
    name: string;
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
}

export interface SelectedFood {
    food: Food;
    quantity: number;
}