interface SelectedFoodsProps {
    selectedFoods: any;
    currentDate: string;
    removeFood: (index: number) => void;
}

export default function SelectedFoods({ selectedFoods, currentDate, removeFood }: SelectedFoodsProps) {
    return (
        <>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Mat lagt til</h2>
            {selectedFoods[currentDate].length === 0 ? (
                <p className="text-gray-500">Ingen mat lagt til ennå.</p>
            ) : (
                <ul className="space-y-2">
                    {selectedFoods[currentDate].map((food: any, index: number) => (
                        <li
                            key={`${food.id}-${index}`}
                            className="flex justify-between items-center p-2 bg-white rounded shadow text-gray-900"
                        >
                            <span>
                                {food.name} - {food.calories} kcal (Fat: {food.fat}g, Protein: {food.protein}g, Carbs: {food.carbs}g)
                            </span>
                            <button
                                onClick={() => removeFood(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Fjern
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}