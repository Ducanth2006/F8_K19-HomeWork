const renderUi = ({ username, email, firstName, lastName, gender }) => {
  document.getElementById("username").textContent = username;
  document.getElementById("email").textContent = email;
  document.getElementById("firstName").textContent = firstName;
  document.getElementById("lastName").textContent = lastName;
  document.getElementById("gender").textContent = gender;
};
// function handle token
const handleToken=async()=>{
  const refreshToken=localStorage.getItem('refreshToken');
  if(!refreshToken){
    window.location.href="./index.html";
    return
  }
  // get new access token
  try{
    const res=await fetch('https://dummyjson.com/auth/refresh',{
      method:"POST",
      headers:{"Content-Type": "application/json",
      },
      body:JSON.stringify(
        {
          refreshToken:refreshToken,
          expiresInMins:1
        }
      )

    })
    // check access token
    if(res.ok){
      const data=await res.json();
      localStorage.setItem('accessToken',data.accessToken);
      localStorage.setItem('refreshToken',data.refreshToken);
      console.log("Change access token successfully")
      await loadUserProfile(data.accessToken);
    }
    // check if refresh token expired
    else{
      alert("Session expired")
      localStorage.clear();
      window.location.href="./index.html";
    }

  }catch(error){
    console.log("error when refresh token");

  };
  
}

// function loadUserProfile
const loadUserProfile = async (token) => {
  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      console.log("hết token rồi  lấy token mới");
      await handleToken(); 
      return;
    }
    if(res.ok){
        const userData=await res.json();
        renderUi(userData);
    }
  } catch (error) {
    console.log("ko thể lấy dữ liệu");
  }
};

const token=localStorage.getItem('accessToken');
if(!token){
    console.log("You don't have any token")
    window.location.href="./index.html"
}
else{
    console.log("Yes you have a token")
    loadUserProfile(token);
}
