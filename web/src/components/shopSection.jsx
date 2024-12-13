import React from "react";

function ShopSection() {
  return (
    <div className="w-full h-[75vw] bg-white relative">
      <p className="font-helvetica font-normal text-[5vw] sm:text-[4vw] flex justify-center items-center md:text-[3vw] lg:text-[2vw] absolute inset-0 top-[-87.5%]">
        New Arrivals
      </p>
      <div className="flex justify-between items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] absolute top-[10%] left-[50%] transform -translate-x-1/2">
        <button className="text-grey font-helvetica font-normal text-[2vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-[1.3vw] no-underline border-none bg-inherit focus:text-black hover:scale-[1.07]">
          WHITE
        </button>
        <button className="text-grey font-helvetica font-normal text-[2vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-[1.3vw] no-underline border-none bg-inherit focus:text-black hover:scale-[1.07]">
          BLACK
        </button>
        <button className="text-grey font-helvetica font-normal text-[2vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-[1.3vw] no-underline border-none bg-inherit focus:text-black hover:scale-[1.07]">
          COLORED
        </button>
      </div>
      <div className="h-[60vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] w-full absolute top-[15%] px-[5%] sm:px-[7%] md:px-[10%] lg:px-[80px]">
        <div className="flex justify-between">

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
            <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/dndR1.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Do Not Disturb Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/existenceB1.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Existence Confronts Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/ordinaryG1.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Extra Ordinary Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/anotherDay2.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Another Day Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/tranq2.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Tranquility Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/conceit1.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Conceit Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/superiorityG.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Superiority Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>

          <div className="relative h-[26vw] sm:h-[30vw] md:h-[26vw] lg:h-[26vw] hover:scale-[1.02]">
          <div className="w-[100%] sm:w-[75%] md:w-[85%] lg:w-[90%] xl:w-[100%] 2xl:w-[110%] h-[80%] sm:h-[60%] md:h-[65%] lg:h-[75%] xl:h-[75%] 2xl:h-[80%] bg-[#f1f1f1] flex justify-center items-center">
              <img src="/rise2.png" alt="Logo" className="w-[18vw] sm:w-[20vw] md:w-[18vw] lg:w-[18vw] drop-shadow-md" />
            </div>
            <div>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[82%]">T-Shirt</p>
              <p className="font-helvetica font-bold text-[1.25vw] absolute top-[87.2%]">
                Rise Beyond Tee
              </p>
              <p className="font-helvetica text-[1vw] text-grey absolute top-[94%]">₱499.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopSection;
