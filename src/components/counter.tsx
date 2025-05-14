export default function Counter({ totals, goals }: any) {
    // Calculate progress percentage (0 to 100)
    const progress = Math.min((totals.calories / goals.calories) * 100, 100);

    // SVG circle properties
    const radius = 45; // Radius of the circle (adjusted for viewBox 100x100)
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    function calculateCaloryGoalDifference(calories: number, goal: number): number {
        if (calories > goal) {
            return calories - goal;
        } else {
            return goal - calories;
        }
    }

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle (gray) */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb" // Tailwind gray-200
                        strokeWidth="1"
                    />
                    {/* Progress circle (blue) */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#3b82f6" // Tailwind blue-500
                        strokeWidth="1"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 ease-in-out"
                        transform="rotate(-90 50 50)"
                    />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-gray-900">
                    <span className="text-lg sm:text-2xl text-center">
                        {calculateCaloryGoalDifference(totals.calories, goals.calories)}
                    </span>
                    <span className="text-sm sm:text-base text-center">{totals.calories > goals.calories ? "over" : "igjen"}</span>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 rounded-lg bg-white shadow p-4 sm:p-6 w-full sm:w-auto">
                <div className="flex flex-col items-center justify-center w-full sm:w-24 h-20 sm:h-24 text-gray-900 ml-5 mr-5">
                    <span className="text-xs sm:text-sm font-semibold">Kalorier</span>
                    <span className="text-base sm:text-lg">{totals.calories.toFixed(1)}/{goals.calories}kcal</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full sm:w-24 h-20 sm:h-24 text-gray-900 ml-5 mr-5">
                    <span className="text-xs sm:text-sm font-semibold">Carbs</span>
                    <span className="text-base sm:text-lg">{totals.carbs.toFixed(1)}/{goals.carbs}g</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full sm:w-24 h-20 sm:h-24 text-gray-900 ml-5 mr-5">
                    <span className="text-xs sm:text-sm font-semibold">Protein</span>
                    <span className="text-base sm:text-lg">{totals.protein.toFixed(1)}/{goals.protein}g</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full sm:w-24 h-20 sm:h-24 text-gray-900 ml-5 mr-5">
                    <span className="text-xs sm:text-sm font-semibold">Fat</span>
                    <span className="text-base sm:text-lg">{totals.fat.toFixed(1)}/{goals.fat}g</span>
                </div>
            </div>
        </div>
    );
}