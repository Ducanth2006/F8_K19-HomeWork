import type { TagProps } from "../../types/tag"

function NextTag({ handle, className = "" }: TagProps) {
    return (<button onClick={handle} className={`flex rounded-full shrink-0 items-center justify-center w-8 h-8 bg-gray-100 border text-green-600 hover:border-green-600 hover:text-white  shadow-sm transition hover:bg-gray-50 active:scale-95 ${className} `}>  <span className="text-sm">❯</span></button>)
}
export default NextTag;