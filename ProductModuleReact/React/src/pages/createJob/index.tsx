import JobCreateForm from "@/features/create-job/ui/jobCreateForm"
import {useNavigate} from "react-router"
import { type Job } from "@/entities/job/model/createJobTypes"
function CreateJobPage(){
    const nav=useNavigate()
    const handleSuccess =(job:Job)=>{
        nav(`/cong-viec/${job.slug}`)

    }
    return (<JobCreateForm onSuccess={handleSuccess}/>)
}
export default CreateJobPage;