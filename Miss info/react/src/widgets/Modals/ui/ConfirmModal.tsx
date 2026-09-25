interface ConfirmModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({ isOpen, onCancel, onConfirm }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-custom z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl transform transition-all">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400 text-2xl">
                    <i className="fa-solid fa-question"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Xác nhận lựa chọn</h3>
                <p className="text-slate-300 text-sm mb-6">Bạn có chắc chắn muốn chọn đáp án này là câu trả lời cuối cùng không?</p>
                
                <div className="flex gap-3 justify-center">
                    <button onClick={onCancel} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition">
                        Thử chọn lại
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-bold text-sm shadow-md transition">
                        Chốt đáp án!
                    </button>
                </div>
            </div>
        </div>
    );
};