interface DateSwitchProps {
    currentDate: string;
    changeDate: (days: number) => void;
}

export default function DateSwitch({ currentDate, changeDate }: DateSwitchProps) {
    return (
        <div className="mb-4 flex justify-center gap-4">
            <button
                onClick={() => changeDate(-1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Forrige dag
            </button>
            <span className="text-gray-900">{currentDate}</span>
            <button
                onClick={() => changeDate(1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Neste dag
            </button>
        </div>
    );
}
