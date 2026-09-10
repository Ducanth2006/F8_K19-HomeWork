import { BrowserRouter, Routes, Route } from "react-router";

import DefaultLayout from "@/widgets/layout/ui/DefaultLayout";

import {
  Company,
  Home,
  CompanyDetail,
  JobDetail,
  CreateJobPage,
  MakeCVPage,
  LoginPage,
  EmployerRegisterPage,
  CandidateRegisterPage,
} from "@/pages";
import ScrollTop from "../ui/ScollTop";
import { ProtectedRouter } from "../ui/ProtectedRouter";
function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cong-ty" element={<Company />} />
          <Route path="/cong-ty/:id" element={<CompanyDetail />} />
          <Route path="/cong-viec/:slug" element={<JobDetail />} />
          <Route element={<ProtectedRouter allowRole="CANDIDATE" />}>
            <Route path="/tao-cv" element={<MakeCVPage />}></Route>
          </Route>
          <Route element={<ProtectedRouter allowRole="EMPLOYER" />}>
            <Route path="/tao-job" element={<CreateJobPage />}></Route>
          </Route>
        </Route>
        <Route path="/dang-nhap" element={<LoginPage />}></Route>
        <Route path="/dang-ky" element={<CandidateRegisterPage />}></Route>
        <Route
          path="/cong-ty-dang-ky"
          element={<EmployerRegisterPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
