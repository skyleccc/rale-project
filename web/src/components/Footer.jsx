import React from "react";

function Footer() {
  return (
    <div className="relative flex">
    <div className="absolute w-full sm:scale-[50%] md:scale-[50%] lg:scale-[80%] xl:scale-[100%] 2xl:scale-[100%]">
      <img src="/last.jpg" alt="Logo" className="w-full"/>

      
        <div className="absolute top-[2.8%] left-[35.7%] text-white text-[8vw] font-bold tracking-[-7px]">
            rale.cco
        </div>

        <div className="absolute top-[6.45%] left-[36%] text-white text-[1.55vw] font-light italic tracking-[-2px]">
            est. 2023
        </div>

        <div className="absolute top-[25%] left-[15%] flex items-center space-x-2 cursor-pointer">
            <img
            src="/fb.png"
            alt="Facebook Logo"
            className="w-[50px] h-[50px]"
            />
            <a
            target="_blank"
            href="https://facebook.com/rale.cco"
            className="text-white text-[1.5rem] font-bold no-underline"
            >
            facebook.com/rale.cco
            </a>
        </div>

        <div className="absolute top-[25%] left-[58.4%] flex items-center space-x-2 cursor-pointer">
            <img
            src="/ig.png"
            alt="Instagram Logo"
            className="w-[50px] h-[50px]"
            />
            <a
            target="_blank"
            href="https://instagram.com/rale.cco"
            className="text-white text-[1.5rem] font-bold no-underline"
            >
            instagram.com/rale.cco
            </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
