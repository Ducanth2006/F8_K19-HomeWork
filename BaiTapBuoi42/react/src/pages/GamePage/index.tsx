import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  QuestionBox,
  type Question,
  getQuestions,
  type Prize,
  getPrizes,
  MoneyLadder,
} from "@/entities";
import { AnswerOptions, Lifelines } from "@/features";
import {
  AudienceModal,
  ConfirmModal,
  GameOverModal,
  PhoneModal,
  WalkAwayModal,
} from "@/widgets";
import { formatVND } from "@/shared/utils/format";

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
  const [status, setStatus] = useState<"win" | "lose" | "walkaway">("lose");
  const [isQuiting, setQuiting] = useState<boolean>(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [usedLifelines, setUsedLifelines] = useState<{ [key: string]: boolean }>({});
  const [isOpenAudienceModal, setOpenAudienceModal] = useState<boolean>(false);
  const [audienceData, setAudienceData] = useState<number[]>([0, 0, 0, 0]);
  const [isOpenPhoneModal, setOpenPhoneModal] = useState<boolean>(false);
  const [phoneDialogue, setPhoneDialogue] = useState<string>("");

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
        console.log("Lỗi không lấy được api");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, []);

  const currentQuestion = questions[currentQuestionNum];

  const nav = useNavigate();
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
    return Number(val.replace(/\D/g, "")) || 0;
  };
  const onConfirm = () => {
    setRevealed(true);
    const currentMoney = parseMoney(arrPrize[currentQuestionNum]?.amount);
    if (selectedOption === currentQuestion.correct) {
      if (currentQuestionNum === questions.length - 1) {
        setOpenGameOverModal(true);
        setOpenConfirmModal(false);
        setCurMoney(currentMoney);
        setStatus("win");
        return;
      }
      setCurMoney(currentMoney);
      setCurrentQuestionNum((prev) => prev + 1);
      setSelectedOption(null);
      setHiddenOptions([]);
      setOpenConfirmModal(false);
      setRevealed(false);
    } else {
      if (currentQuestionNum === questions.length - 1) {
        setOpenConfirmModal(true);
      }
      setOpenConfirmModal(false);
      setTimeout(() => setOpenGameOverModal(true), 1200);
      setCurrentQuestionNum(1);
      setSelectedOption(null);
    }
  };

  const onConfirmLeavingModal = () => {
    setQuiting(false);
    setOpenGameOverModal(true);
    setStatus("walkaway");
  };

  const onCancelLeavingModal = () => {
    setQuiting(false);
  };
  const onRestart = () => {
    nav("/");
  };
  const getModalTitle = () => {
    switch (status) {
      case "win":
        return "Chúc mừng nhà vô địch";
      case "walkaway":
        return "1 quyết định tuyệt vời";
      default:
        return `Đáp án đúng là ${currentQuestion?.answers[currentQuestion.correct]}`;
    }
  };

  const generatePollData = (correctIndex: number, hidden: number[]) => {
    const data = [0, 0, 0, 0];
    const activeWrong = [0, 1, 2, 3].filter(
      (idx) => idx !== correctIndex && !hidden.includes(idx)
    );
    data[correctIndex] = 65;
    if (activeWrong.length > 0) {
      const part = Math.floor(35 / activeWrong.length);
      activeWrong.forEach((idx, i) => {
        data[idx] =
          i === activeWrong.length - 1 ? 35 - part * (activeWrong.length - 1) : part;
      });
    }
    return data;
  };

  const handleUseLifeline = (type: string) => {
    if (usedLifelines[type] || !currentQuestion) return;
    setUsedLifelines((prev) => ({ ...prev, [type]: true }));

    if (type === "5050") {
      const wrongIndices = [0, 1, 2, 3].filter(
        (idx) => idx !== currentQuestion.correct
      );
      const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
      setHiddenOptions(shuffled.slice(0, 2));
    } else if (type === "phone") {
      const label = ["A", "B", "C", "D"][currentQuestion.correct];
      setPhoneDialogue(
        `Theo mình nghĩ thì đáp án đúng có khả năng cao là ${label}: ${currentQuestion.answers[currentQuestion.correct]}`
      );
      setOpenPhoneModal(true);
    } else if (type === "audience") {
      setAudienceData(generatePollData(currentQuestion.correct, hiddenOptions));
      setOpenAudienceModal(true);
    } else if (type === "switch") {
      setHiddenOptions([]);
      setCurrentQuestionNum((prev) => (prev + 1) % questions.length);
    }
  };

  return (
    <div>
      <button
        className="rounded-xl mb-3 px-5 py-2.5 bg-violet-500 text-white font-semibold cursor-pointer"
        onClick={() => setQuiting(true)}
      >
        Rời game
      </button>
      {isLoading ? (
        <div>Is loading .......... </div>
      ) : (
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-8 flex flex-col gap-4">
            <Lifelines usedLifelines={usedLifelines} onUse={handleUseLifeline} />
            <QuestionBox
              currentQuestionNum={currentQuestionNum + 1}
              questionText={currentQuestion.question}
            />
            <GameOverModal
              isOpen={isOpenGameOverModal}
              title={getModalTitle()}
              description={`${status !== "win" ? "lần sau làm lại nha" : "Thắng rồi vip quá"}`}
              status={status}
              finalPrize={formatVND(String(curMoney), true)}
              onRestart={onRestart}
            />
            <ConfirmModal
              isOpen={isOpenConfirmModal}
              onConfirm={onConfirm}
              onCancel={onCancelConfirmModal}
            />
            <WalkAwayModal
              isOpen={isQuiting}
              currentPrize={formatVND(String(curMoney))}
              onConfirm={onConfirmLeavingModal}
              onCancel={onCancelLeavingModal}
            />
            <AudienceModal
              isOpen={isOpenAudienceModal}
              pollData={audienceData}
              onClose={() => setOpenAudienceModal(false)}
            />
            <PhoneModal
              isOpen={isOpenPhoneModal}
              dialogue={phoneDialogue}
              onClose={() => setOpenPhoneModal(false)}
            />
            <AnswerOptions
              options={currentQuestion.answers}
              selectedOption={selectedOption}
              correctOption={isRevealed ? currentQuestion.correct : null}
              hiddenOptions={hiddenOptions}
              onSelect={onSelect}
            />
          </div>
          <div className="col-span-2">
            <MoneyLadder currentLevel={currentQuestionNum} prizeLadder={arrPrize} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
