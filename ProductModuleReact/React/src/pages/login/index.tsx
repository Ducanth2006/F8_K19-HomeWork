import { useNavigate } from "react-router";

import { LoginForm } from "@/features/auth-login";

function LoginPage() {
  const nav = useNavigate();
  const handleNavToCandidateRegisterPage = () => {
    nav("/dang-ky");
  };
  const hanndleNavToEmployerRegisterPage = () => {
    nav("/cong-ty-dang-ky");
  };
  const onSuccess = () => {
    nav("/");
  };
  return (
    <LoginForm
      onSuccess={onSuccess}
      onNavToCandidateRegisterPage={handleNavToCandidateRegisterPage}
      onNavToEmployerRegisterPage={hanndleNavToEmployerRegisterPage}
    />
  );
}
export default LoginPage;
