import {createContext,useContext} from "react"

interface HomeContextProps{
    hanldeNavToJobListPage:(slug:string)=>void
}
export const HomeContext=createContext<HomeContextProps|null>(null)

export const useHome=()=>{
    const context=useContext(HomeContext);
    if(!context){
        throw new Error("Phải dùng HomeContext nhé ")
    }
    return context
}