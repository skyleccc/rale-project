import React from "react";

function Navbar() {
  return (
    <div className="h-[52.6vw] bg-[url('/firstpageBG.png')] relative">
      <img
        src="/firstpageMain.png"
        alt="Logo"
        className="w-[84.3%] -ml-[8vw] z-0"
      />
      
      <img
        src="/img1.png"
        alt="Logo"
        className="absolute w-[9vw] top-[3.5%] left-[77.2%] m-[10px] z-0"
      />

      <img
        src="/img2.png"
        alt="Logo"
        className="absolute w-[9vw] top-[3.5%] left-[88.3%] m-[10px] z-0"
      />

      <div className="relative z-10 w-full h-screen">
        <div className="font-dela-gothic-one text-[14vw] font-normal absolute top-[-50%] left-[48%] text-white tracking-[-30px] drop-shadow-lg">
          WEAR
        </div>
        <div className="font-helvetica text-[13vw] font-normal absolute top-[-30.5%] left-[47.5%] text-white tracking-[-10px] drop-shadow-lg">
          BETTER
        </div>
      </div>

    </div>  
  );
}

export default Navbar;
