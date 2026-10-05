import { useNavigate } from "react-router";

import { EmployerRegisterForm } from "@/features/employer-register";

function EmployerRegisterPage() {
  const navigate = useNavigate();
  const handleSuccess = () => navigate("/dang-nhap");
  const handleNavToLoginPage = () => navigate("/dang-nhap");

  return <EmployerRegisterForm onSuccess={handleSuccess} onNavToLoginPage={handleNavToLoginPage} />;
}

export default EmployerRegisterPage;
