interface DateSwitchProps {
    currentDate: string;
    changeDate: (days: number) => void;
}

export default function DateSwitch({ currentDate, changeDate }: DateSwitchProps) {

    const formatDateNorwegianStyle = (currentDate: string) => {
        const date = new Date(currentDate);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    }

    return (
        <div className="mb-2 flex justify-center gap-4">
            <button
                onClick={() => changeDate(-1)}
                className="px-4 py-2  text-white rounded"
            >
                <svg className="text-black w-6 h-6 cursor-pointer" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <span className="text-gray-900 mt-2 cursor-pointer" onClick={() => changeDate(0)}>{formatDateNorwegianStyle(currentDate)}</span>
            <button
                onClick={() => changeDate(1)}
                className="px-4 py-2  text-white rounded "
            >
                <svg className="text-black w-6 h-6 cursor-pointer" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
