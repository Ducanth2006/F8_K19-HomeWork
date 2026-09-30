import { useState, useEffect ,useRef } from "react";
import { useNavigate } from "react-router";

import {
  QuestionBox,
  type Question,
  getQuestions,
  getQuestionsBackup,
  getQuestionById,
  type Prize,
  getPrizes,
} from "@/entities";
import { AnswerOptions } from "@/features";
import { ConfirmModal, GameOverModal } from "@/widgets";
import {formatVND} from "@/shared/utils/format"

function GamePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [arrPrize, setArrPrize] = useState<Prize[]>([]);
  const [curMoney, setCurMoney] = useState<number>(0);
  const [currentQuestionNum, setCurrentQuestionNum] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [isRevealed, setRevealed] = useState<boolean>(false);
  const [isOpenGameOverModal, setOpenGameOverModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [status, setStatus] =useState<'win' | 'lose' | 'walkaway'>("lose")

  useEffect(() => {
    setLoading(true);
    const fetchQuestion = async () => {
      try {
        const res = await getQuestions();
        const pr = await getPrizes();
        setQuestions(res);
        setArrPrize(pr);
        setLoading(false);
      } catch (e) {
        console.log("Lỗi không lấy được api ");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, []);
  const currentQuestion = questions[currentQuestionNum];
  
  const nav= useNavigate();
  const onSelect = (index: number) => {
    setSelectedOption(index);
    setOpenConfirmModal(true);
  };
  const onCancelConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedOption(null);
    
  };
  const parseMoney = (val: string | number | undefined): number => {
  if (!val) return 0;
  if (typeof val === "number") return val;
  // Xóa mọi ký tự không phải số: "1.500.000" -> "1500000"
  return Number(val.replace(/\D/g, "")) || 0;
};
  const onConfirm = () => {
    setRevealed(true);
    const currentMoney=parseMoney(arrPrize[currentQuestionNum]?.amount)
    if (selectedOption === currentQuestion.correct) {
      if(currentQuestionNum===questions.length){
        setOpenGameOverModal(true);
        setStatus('win');
        return ;
      }  
      setCurMoney(currentMoney);
      setCurrentQuestionNum((prev) => prev + 1);
      setSelectedOption(null);
      setOpenConfirmModal(false);
      setRevealed(false);
    } else {
      if(currentQuestionNum===questions.length){
        setOpenConfirmModal(true)
      }  
      console.log("chọn sai rồi ");
      setOpenConfirmModal(false);
      setOpenGameOverModal(true);
      setCurrentQuestionNum(1);
      setSelectedOption(null);
    }
  };

  const onRestart =()=>{
    nav("/")
  }
  
  return (
    <div className="mt-10">
      {isLoading ? (
        <div>Is loading .......... </div>
      ) : (
        <>
          <QuestionBox
            currentQuestionNum={currentQuestionNum}
            questionText={currentQuestion.question}
          />
          <GameOverModal
            isOpen={isOpenGameOverModal}
            title={`Đáp an đúng là ${currentQuestion.correct + 1}`}
            description={`${status!=="win" ? "lần sau làm lại nha" : "Thắng rồi vip quá"}`}
            status={status}
            finalPrize={formatVND(String(curMoney),true)}
            onRestart={onRestart}

          />
          <ConfirmModal
            isOpen={isOpenConfirmModal}
            onConfirm={onConfirm}
            onCancel={onCancelConfirmModal}
          />
          <AnswerOptions
            options={currentQuestion.answers}
            selectedOption={selectedOption}
            correctOption={isRevealed ? currentQuestion.correct : null}
            hiddenOptions={[]}
            onSelect={onSelect}
          />
        </>
      )}
    </div>
  );
}
export default GamePage;
