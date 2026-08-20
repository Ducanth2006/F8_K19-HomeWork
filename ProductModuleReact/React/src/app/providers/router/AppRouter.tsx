import { BrowserRouter, Routes, Route } from "react-router";

import DefaultLayout from "@/widgets/layout/ui/DefaultLayout";

import { Company, Home, CompanyDetail, JobDetail } from "@/pages";
import ScrollTop from "../ui/ScollTop";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
