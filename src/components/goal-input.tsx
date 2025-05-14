interface GoalInputProps {
    goals: any;
    handleGoalChange: (goal: any) => void;
}


export default function GoalInput({ goals, handleGoalChange }: GoalInputProps) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Set Your Daily Goals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div>
                    <label className="text-gray-900">Calories (kcal)</label>
                    <input
                        type="number"
                        name="calories"
                        value={goals.calories}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded text-gray-900 bg-white"
                        placeholder="Enter calorie goal"
                    />
                </div>
                <div>
                    <label className="text-gray-900">Carbs (g)</label>
                    <input
                        type="number"
                        name="carbs"
                        value={goals.carbs}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded text-gray-900 bg-white"
                        placeholder="Enter carbs goal"
                    />
                </div>
                <div>
                    <label className="text-gray-900">Protein (g)</label>
                    <input
                        type="number"
                        name="protein"
                        value={goals.protein}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded text-gray-900 bg-white"
                        placeholder="Enter protein goal"
                    />
                </div>
                <div>
                    <label className="text-gray-900">Fat (g)</label>
                    <input
                        type="number"
                        name="fat"
                        value={goals.fat}
                        onChange={handleGoalChange}
                        className="w-full p-2 border rounded text-gray-900 bg-white"
                        placeholder="Enter fat goal"
                    />
                </div>
            </div>
        </div>
    );
}