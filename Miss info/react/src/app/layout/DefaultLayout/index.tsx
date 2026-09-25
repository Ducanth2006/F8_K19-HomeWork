import { Outlet } from "react-router";

import { Footer, Header } from "@/widgets";

function DefaultLayout() {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        <Header isPlaying={false} timeLeft={0} onWalkAway={() => null} />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
export default DefaultLayout;