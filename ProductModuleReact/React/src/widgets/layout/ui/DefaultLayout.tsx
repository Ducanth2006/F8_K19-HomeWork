import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

import GlobalHeader from "../../header/ui/GlobalHeader";
import DefaultFooter from "../../footer/ui/DefaultFooter";
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