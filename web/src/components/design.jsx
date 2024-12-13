import React from "react";

function Design() {
    return (
        <div className="h-[50vw] bg-white pl-[100px] pr-[100px] relative flex items-center sm:scale-[50%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%]  2xl:scale-[100%]">
            <div className="designCont2">
                <img src="/design1.jpg" alt="Logo" className="w-[30.2vw] absolute top-[-15%]" />
            </div>
            <div className="designCont3">
                <img src="/design2.jpg" alt="Logo" className="absolute left-[37%] w-[57.2vw] top-[-15%]" />
                <img src="/design3.jpg" alt="Logo" className="absolute left-[37%] w-[57.2vw] top-[37.3%]" />
            </div>
        </div>
    );
}

export default Design;
