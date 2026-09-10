
export const getAccessToken=():string|null=>{
    return localStorage.getItem("accessToken");
}
export const setAccessToken=(key:string):void=>{
    localStorage.setItem("accessToken",key);
}
export const removeAccessToken=():void=>{
    localStorage.removeItem("accessToken")
}