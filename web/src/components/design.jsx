import React from "react";

function Design() {
    return (
        <div className="h-[50vw] z-[-2] md:z-[2] bg-white pl-[100px] pr-[100px] relative flex items-center sm:scale-[50%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%]  2xl:scale-[100%] top-[6vh] md:top-0">
            <div className="designCont2">
                <img src="/design1.jpg" alt="Logo" className="w-[25vw] md:w-[30.2vw] left-[13vw] md:left-[6vw] absolute md:top-[-15%]" />
            </div>
            <div className="designCont3">
                <img src="/design2.jpg" alt="Logo" className="absolute w-[45vw] left-[40%] top-[50%] md:left-[37%] md:w-[57.2vw] md:top-[-15%]" />
                <img src="/design3.jpg" alt="Logo" className="absolute w-[45vw] left-[40%] top-[94%] md:left-[37%] md:w-[57.2vw] md:top-[37.3%]" />
            </div>
        </div>
    );
}

export default Design;
