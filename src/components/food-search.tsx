import { useTranslation } from "react-i18next";

interface FoodSearchProps {
  searchTerm: string;
  filteredFoods: any;
  addFood: (food: any) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export default function FoodSearch({
  searchTerm,
  filteredFoods,
  addFood,
  setSearchTerm,
}: FoodSearchProps) {
  const {t} = useTranslation("global");

  return (
    <>
      <input
        type="text"
        placeholder={t("tracker.foodsearch.search")}
        className="w-full p-3 sm:p-2 mb-4 border rounded text-gray-900 bg-white text-base sm:text-base"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {searchTerm !== "" &&
          filteredFoods.map((food: any) => (
            <div
              key={food.id}
              onClick={() => addFood(food)}
              className="p-3 sm:p-2 bg-white rounded shadow cursor-pointer text-gray-900 text-sm sm:text-base"
            >
              {food.name} - {food.calories} kcal ({t("tracker.counter.fat")}: {food.fat}g, {t("tracker.counter.proteins")}: {food.protein}g, {t("tracker.counter.carbs")}: {food.carbs}g)
            </div>
          ))}
      </div>
    </>
  );
}