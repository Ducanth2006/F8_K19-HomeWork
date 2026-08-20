import { BrowserRouter, Route, Routes } from "react-router";

import { StartPage, GamePage } from "@/pages";
import DefaultLayout from "../layout/DefaultLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<StartPage />} />
          <Route path="/Game" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
