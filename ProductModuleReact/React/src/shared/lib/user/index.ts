interface User {
  id: string;
  email: string;
  role: string;
}
const userKey = "useInfo";
export const getUserInfo = (): User | null => {
  const info = localStorage.getItem(userKey);
  if (!info) return null;
  try {
    return JSON.parse(info) as User;
  } catch (e) {
    console.log(e, "có lỗi khi ép kiểu json ");
    localStorage.removeItem(userKey);
    return null;
  }
};
export const setUserInfo = (data: User) => {
  try {
    localStorage.setItem(userKey, JSON.stringify(data));
  } catch (e) {
    console.error("Lỗi lưu userInfo vào localStorage:", e);
  }
};
export const removeUserInfo=()=>{
    try{localStorage.removeItem(userKey)}catch(e){
        console.log("Lỗi khi xóa userInfo")
    }
}