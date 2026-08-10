import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

import GlobalHeader from "../../components/GlobalHeader";
import DefaultFooter from "./footer";
function DefaultLayout() {
  return (
    <>
      <ToastContainer />
      <GlobalHeader />
      <div>
        <Outlet />
      </div>
      <DefaultFooter />
    </>
  );
}
export default DefaultLayout;
