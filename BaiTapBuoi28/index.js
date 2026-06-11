// post login request
const postReq = async (name, password) => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        password: password,
        expiresInMins:1// assume expiresInMins equals 1 minute 
      }),
    });
    return await res.json();
  } catch (error) {
    alert("Post failed");
    return null;
  }
};
const onLogin = async (e) => {
  e.preventDefault();
  let name = document.querySelector("input[name=name]").value;
  let password = document.querySelector("input[name=pass]").value;
  name = name.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  password = password.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const response = await postReq(name, password);
  if (response.accessToken&&response.refreshToken&& response) {
    const { accessToken, refreshToken } = response;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    window.location.href = "./profile.html";
  }else{
    alert("Wrong password");
  }
};
const loginBtn = document.querySelector("button");
loginBtn.addEventListener("click", onLogin);
