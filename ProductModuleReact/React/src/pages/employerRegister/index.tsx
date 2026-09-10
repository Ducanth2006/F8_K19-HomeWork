import {useNavigate} from "react-router"

import {EmployerRegisterForm} from "@/features/employer-register"

function EmployerRegisterPage(){
    const nav=useNavigate();
    const onSuccess=()=>{
        nav("/dang-nhap")
    }
    return (<EmployerRegisterForm onSuccess={onSuccess}/>)
}
export default EmployerRegisterPage;