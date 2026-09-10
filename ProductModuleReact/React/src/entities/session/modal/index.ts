import {getUserInfo} from "@/shared/lib/user"
import {getAccessToken} from "@/shared/lib/token"

export const useSession=()=>{
    const token=getAccessToken();
    const userInfo=getUserInfo();
    return {
        isAuthenticated:!!token,
        role:userInfo?.role||null,
        userInfo
    }
}