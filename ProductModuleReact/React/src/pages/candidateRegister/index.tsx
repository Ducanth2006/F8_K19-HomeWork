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
    const handleNavToLoginPage =()=>{
        nav("/dang-nhap")
    }
    return (<CandidateRegisterForm onNavToEmployerRegisterPage={handleNavToEmployerRegisterPage} onNavToLoginPage={handleNavToLoginPage} onSuccess={onSuccess}/> )
}
export default CandidateRegisterPage;
