import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation("global");
  const foods = selectedFoods[currentDate] || [];

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">{t("tracker.foodsearch.chosenfood")}</h2>
      {foods.length === 0 ? (
        <p className="text-gray-500">{t("tracker.foodsearch.nofood")}</p>
      ) : (
        <ul className="space-y-2">
          {foods.map((item: SelectedFood, index: number) => (
            <li
              key={`${item.food.id}-${index}`}
              className="flex justify-between items-center p-2 bg-gray-100 rounded"
            >
              <span>
                {item.food.name} - {(item.food.calories * item.quantity).toFixed(0)} kcal
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => removeFood(index)}
                  className="px-2 py-1 border text-sm border-gray-300 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t("tracker.foodsearch.remove")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}