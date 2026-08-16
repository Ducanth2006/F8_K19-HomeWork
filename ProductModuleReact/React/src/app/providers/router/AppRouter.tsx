import { BrowserRouter, Routes, Route } from "react-router";

import DefaultLayout from "@/widgets/layout/ui/DefaultLayout";
import Company from "@/pages/company";
import Home from "@/pages/home";
import CompanyDetail from "@/pages/companyDetail";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cong-ty" element={<Company />} />
          <Route path="/cong-ty/:id" element={<CompanyDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;