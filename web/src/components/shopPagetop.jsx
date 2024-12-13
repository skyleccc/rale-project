import React from "react";
import { Link } from "react-router-dom";

function shopPagetop() {
    return (
        <div className="relative mx-auto">
            <div className="w-2/3 h-[80vh] mx-auto ">
                <img src="/2pmain.png" alt="rale" className="absolute w-[100vw] top-[-16.5%] left-[0%] z-0"/>
                <div className="absolute font-bold font-archivo-black text-[15vw] tracking-tighter left-[27.4%] top-[-6.5%] z-[-1] text-white" style={{ transform: "scaleX(1.4)" }}>SHOP</div>
                <div className="relative bg-gray-200 w-full h-[80vh] mx-auto z-[-3]"></div>
            </div>
            
        </div>
    );
}

export default shopPagetop;