interface FoodSearchProps {
    searchTerm: string;
    filteredFoods: any;
    addFood: (food: any) => void;
    setSearchTerm: (searchTerm: string) => void;
}

export default function FoodSearch({ searchTerm, filteredFoods, addFood, setSearchTerm }: FoodSearchProps) {
    return (
        <>
            <input
                type="text"
                placeholder="Søk etter mat..."
                className="w-full max-w-md p-2 mb-4 border rounded text-gray-900 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
                    {searchTerm !== '' && filteredFoods.map((food: any) => (
                        <div
                            key={food.id}
                            onClick={() => addFood(food)}
                            className="p-2 bg-white rounded shadow cursor-pointer text-gray-900"
                        >
                            {food.name} - {food.calories} kcal (Fat: {food.fat}g, Protein: {food.protein}g, Carbs: {food.carbs}g)    
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}