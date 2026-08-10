import HeaderNav from "./components/Navigation/Navigation";

function GlobalHeader() {
  return (
    <>
      <header className=" bg-white flex justify-between p-2 text-sm">
        {/* Left header */}
        <div className="flex items-center gap-2 lg-gap-4">
          <img
            src="https://static.topcv.vn/v4/image/logo/topcv-logo-7.png"
            className="h-13 w-auto object-contain"
            alt="TopCV Logo"
          />
          <HeaderNav />
        </div>
        {/* Right header */}
        <div></div>
      </header>
      {/*  <div className="w-full h-100 bg-[linear-gradient(180deg,#002b33,rgba(0,43,51,.25)),linear-gradient(90deg,#008060_21.86%,#2bab60_78.13%)] bg-no-repeat bg-size-[100%_100%]"></div> */}
    </>
  );
}

export default GlobalHeader;
