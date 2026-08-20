interface QuestionBoxProps {
    currentQuestionNum: number;
    questionText: string;
}

export const QuestionBox = ({ currentQuestionNum, questionText }: QuestionBoxProps) => {
    return (
        <div className="relative bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-indigo-500/60 rounded-2xl p-6 sm:p-8 min-h-[160px] sm:min-h-[200px] flex items-center justify-center text-center shadow-2xl">
            <div className="absolute -top-3 left-6 bg-indigo-600 text-slate-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Câu hỏi số <span className="text-yellow-300">{currentQuestionNum}</span>
            </div>
            <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-100 leading-relaxed">
                {questionText}
            </p>
        </div>
    );
};
