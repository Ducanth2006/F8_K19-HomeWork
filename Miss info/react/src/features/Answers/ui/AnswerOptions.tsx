interface AnswerOptionsProps {
    options: string[];
    selectedOption: number | null;
    correctOption: number | null; // Truyền vào khi đã chốt đáp án để highlight
    hiddenOptions: number[]; // Cho quyền 50:50
    onSelect: (index: number) => void;
}

export const AnswerOptions = ({ options, selectedOption, correctOption, hiddenOptions, onSelect }: AnswerOptionsProps) => {
    const getOptionClass = (index: number) => {
        let baseClass = "option-btn p-4 rounded-xl text-left flex items-center gap-3 ";
        if (selectedOption === index && correctOption === null) baseClass += "selected ";
        if (correctOption !== null) {
            if (index === correctOption) baseClass += "correct ";
            else if (index === selectedOption && index !== correctOption) baseClass += "wrong ";
        }
        return baseClass;
    };

    const labels = ['A', 'B', 'C', 'D'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt, idx) => (
                <button 
                    key={idx} 
                    onClick={() => onSelect(idx)} 
                    className={getOptionClass(idx)}
                    style={{ visibility: hiddenOptions.includes(idx) ? 'hidden' : 'visible' }}
                    disabled={selectedOption !== null || correctOption !== null}
                >
                    <span className="font-extrabold text-amber-400 text-base sm:text-lg w-8 h-8 rounded-lg bg-slate-900/80 border border-amber-500/30 flex items-center justify-center shrink-0">
                        {labels[idx]}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200">{opt}</span>
                </button>
            ))}
        </div>
    );
};