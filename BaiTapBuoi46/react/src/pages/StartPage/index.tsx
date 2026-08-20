import { useNavigate } from "react-router";

import { StartScreen } from "@/features";

function StartPage() {
    const navigate = useNavigate();
    const handlePlay = () => {
        navigate(
            "/Game"
        )
    }
    return (<div className="w-full flex-1 bg-gray-700 flex justify-center items-center">
        <StartScreen onStart={handlePlay} />
    </div>)
}
export default StartPage;