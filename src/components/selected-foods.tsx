import type { SelectedFood } from "../types/food";

interface SelectedFoodsProps {
  selectedFoods: { [date: string]: SelectedFood[] };
  currentDate: string;
  removeFood: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
}

export default function SelectedFoods({
  selectedFoods,
  currentDate,
  removeFood,
  updateQuantity,
}: SelectedFoodsProps) {
  // Safely access selectedFoods for the current date, default to empty array
  const foods = selectedFoods[currentDate] || [];

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Valgte matvarer</h2>
      {foods.length === 0 ? (
        <p className="text-gray-500">Ingen matvarer valgt for denne dagen.</p>
      ) : (
        <ul className="space-y-2">
          {foods.map((item: SelectedFood, index: number) => (
            <li
              key={`${item.food.id}-${index}`}
              className="flex justify-between items-center p-2 bg-gray-100 rounded"
            >
              <span>
                {item.food.name} - {item.quantity} enhet(er) (
                {item.food.calories * item.quantity} kcal)
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  -
                </button>
                <button
                  onClick={() => removeFood(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Fjern
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}