import React from "react";

function ShirtCatalog() {
  return (
    <div id="shirtcatalog" className="relative h-[115vw] bg-white p-[100px] sm:scale-[50%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%]  2xl:scale-[100%]">
      <div className="h-full">

        <div className="flex h-[55%] border-2 border-black">

          <div className="h-full w-1/2 border-r-[3px] border-black relative">
            <img
              src="/img5.png"
              alt="Logo"
              className="absolute w-[38vw] top-[-19.7%] left-[6.5%]"
            />
          </div>

          <div className="h-[45%] w-1/2 border-b-[3px] border-black relative">
            <div className="relative h-full w-1/2 border-r-[3px] border-black">
              <img
                src="/superiorityB.png"
                alt="Logo"
                className="absolute w-[20vw] top-[15%] right-[4.8%]"
              />
              <img
                src="/strapped1.png"
                alt="Logo"
                className="absolute w-[20vw] top-[15%] right-[-97.2%]"
              />
              <img
                src="/dndR1.png"
                alt="Logo"
                className="absolute w-[23.5vw] top-[125%] right-[-1%]"
              />
              <img
                src="/dndR2.png"
                alt="Logo"
                className="absolute w-[23.5vw] top-[125%] right-[-100%]"
              />
            </div>
          </div>
        </div>

        <div className="flex h-[35%] border-2 border-black">

          <div className="h-full w-[30%] border-r-[3px] border-black relative">
            <img
              src="/img4.png"
              alt="Logo"
              className="absolute w-[23vw] top-[-14%] left-[5%]"
            />
          </div>

          <div className="h-full w-[30%] border-r-[3px] border-black relative">
            <img
              src="/img3.png"
              alt="Logo"
              className="absolute w-[20.2vw] top-[-0.2%] left-[12.2%]"
            />
            <img
              src="/embrace1.png"
              alt="Logo"
              className="absolute w-[22.5vw] top-[0.5%] right-[-132%]"
            />
            <img
              src="/embrace2.png"
              alt="Logo"
              className="absolute w-[22.5vw] top-[27.6%] right-[-88%]"
            />
          </div>
        </div>

        <div>
          <div className="font-helvetica font-bold text-[1.3vw] text-black">
            <div className="absolute top-[6%] left-[7%]">Tranquility Tee</div>
            <div className="absolute top-[6%] left-[51%]">Superiority Tee</div>
            <div className="absolute top-[6%] left-[73%]">Strapped Tee</div>
            <div className="absolute top-[28%] left-[51%]">Do Not Disturb Tee</div>
            <div className="absolute top-[55.2%] left-[7%]">Rise Beyond Tee</div>
            <div className="absolute top-[55.2%] left-[33.5%]">Rale Football Tee</div>
            <div className="absolute top-[55.2%] left-[59.7%]">Embrace the Chaos Tee</div>
          </div>
        </div>

        <div>
          <div className="font-helvetica font-light italic text-[1.2vw] text-black">
            <div className="absolute top-[7.3%] left-[7%]">₱499.00</div>
            <div className="absolute top-[7.3%] left-[51%]">₱499.00</div>
            <div className="absolute top-[7.3%] left-[73%]">₱499.00</div>
            <div className="absolute top-[29.3%] left-[51%]">₱499.00</div>
            <div className="absolute top-[56.5%] left-[7%]">₱499.00</div>
            <div className="absolute top-[56.5%] left-[33.5%]">₱499.00</div>
            <div className="absolute top-[56.5%] left-[59.7%]">₱499.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShirtCatalog;
