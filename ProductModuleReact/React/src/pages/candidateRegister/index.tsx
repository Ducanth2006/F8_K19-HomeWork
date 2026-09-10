import {useNavigate} from "react-router"

import {CandidateRegisterForm} from "@/features/candidate-register"

function CandidateRegisterPage(){
    const nav= useNavigate();
    const onSuccess=()=>{
        nav("/")
    }
    const handleNavToEmployerRegisterPage =()=>{
        nav("/cong-ty-dang-ky")
    }
    return (<CandidateRegisterForm onNavToEmployerRegisterPage={handleNavToEmployerRegisterPage} onSuccess={onSuccess}/>)
}
export default CandidateRegisterPage;