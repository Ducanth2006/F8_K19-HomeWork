interface AudienceModalProps {
    isOpen: boolean;
    pollData: number[]; // Mảng chứa % của 4 đáp án [A, B, C, D] (ví dụ: [15, 60, 10, 15])
    onClose: () => void;
}

export const AudienceModal = ({ isOpen, pollData, onClose }: AudienceModalProps) => {
    if (!isOpen) return null;

    const labels = ['A', 'B', 'C', 'D'];

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-custom z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 text-2xl">
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Ý kiến khán giả trường quay</h3>
                
                <div className="space-y-3 mb-6">
                    {labels.map((label, index) => (
                        <div key={label}>
                            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                <span>{label}</span>
                                <span>{pollData[index] || 0}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div 
                                    className="bg-amber-400 h-full transition-all duration-700"
                                    style={{ width: `${pollData[index] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={onClose} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition">
                    Tiếp tục cuộc chơi
                </button>
            </div>
        </div>
    );
};