export default function Counter({ totals, goals }: any) {    
    return (
        <div className="flex justify-center items-center flex-col mb-6">
            <div className="flex items-center justify-center">
                <div className="w-34 h-34 flex items-center justify-center flex-col rounded-full bg-white shadow text-gray-900">
                    <span className="text-2xl text-center">{totals.calories}/{goals.calories}</span>
                    <span className="text-center">kcal</span>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-4 rounded-full bg-white shadow pr-6 pl-6">
                <div className="flex flex-col items-center justify-center w-24 h-24 text-gray-900">
                    <span className="text-sm font-semibold">Carbs</span>
                    <span className="text-lg">{totals.carbs.toFixed(1)}/{goals.carbs}g</span>
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 text-gray-900">
                    <span className="text-sm font-semibold">Protein</span>
                    <span className="text-lg">{totals.protein.toFixed(1)}/{goals.protein}g</span>
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 text-gray-900">
                    <span className="text-sm font-semibold">Fat</span>
                    <span className="text-lg">{totals.fat.toFixed(1)}/{goals.fat}g</span>
                </div>
            </div>
        </div>
    );
}