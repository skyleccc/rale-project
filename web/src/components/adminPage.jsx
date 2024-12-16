import React from "react";
import Header from "./Header";

function CheckoutPage() {
    const handleButtonClick = (event) => {
        const button = event.currentTarget;
        button.classList.add("scale-95", "bg-gray-300");
        setTimeout(() => {
            button.classList.remove("scale-95", "bg-gray-300");
        }, 150);
    };

    return (
        <div className="w-full h-screen">
            <Header />
            <div className="relative bg-gray-200 p-5 w-full h-auto drop-shadow-xl">
                <div
                    className="absolute font-bold drop-shadow-lg font-archivo-black text-[11vw] tracking-tighter text-white"
                    style={{
                        top: "15%",
                        left: "49%",
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        whiteSpace: "nowrap",
                    }}
                >
                    ORDERS
                </div>

                <div>
                    <div className="bg-white z-10 flex flex-col p-5 mx-[10%] gap-4 rounded-2xl relative top-[12vh]">
                        <div className="flex flex-row text-lg px-3">
                            <div className="w-1/12 text-center">Order No.</div>
                            <div className="w-4/12 ">Ordered By</div>
                            <div className="w-4/12 flex items-center justify-center">
                                Product/s
                            </div>
                            <div className="w-3/12 flex justify-between">
                                <div className="w-6/12 text-center">Total Quantity</div>
                                <div className="w-6/12 text-center">Total Price</div>
                            </div>
                        </div>


                        <div className="relative bg-gray-200 p-4 rounded-xl h-auto flex flex-row">
                            <div className="w-1/12 my-auto p-4">
                                <div className="text-xl font-semibold">1</div>
                            </div>
                            <div className="w-4/12 flex flex-col">
                                <div className="my-auto">
                                    <div className="text-lg text-gray-400">09258123912</div>
                                    <div className="text-3xl">Alec Antonio</div>
                                    <div>alecAntonio@gmail.com</div>
                                </div>
                            </div>
                            <div className="w-4/12 flex flex-col items-center">
                                <div className="text-xl text-gray-500 italic">Strapped White Tee - Medium</div>
                                <div className="text-xl text-gray-500 italic">Do Not Disturb Red Tee - Large</div>
                                <div className="text-xl text-gray-500 italic">Superiority Green Tee - Small</div>
                            </div>
                            <div className="w-3/12 flex justify-between items-center">
                                <div className="w-6/12 flex justify-center items-center">
                                    <div className="text-xl border-2 border-black rounded-xl px-3 py-1 inline-block">
                                        1
                                    </div>
                                </div>
                                <div className="w-6/12 text-center text-xl text-gray-500 italic">
                                    ₱1497.00
                                </div>
                            </div>
                            <div className="absolute top-4 right-4">
                                <button className="text-grey-500 font-bold text-xl">
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="relative bg-gray-200 p-4 rounded-xl h-auto flex flex-row">
                            <div className="w-1/12 my-auto p-4">
                                <div className="text-xl font-semibold">1</div>
                            </div>
                            <div className="w-4/12 flex flex-col">
                                <div className="my-auto">
                                    <div className="text-lg text-gray-400">09258123912</div>
                                    <div className="text-3xl">Alec Antonio</div>
                                    <div>alecAntonio@gmail.com</div>
                                </div>
                            </div>
                            <div className="w-4/12 flex flex-col items-center">
                                <div className="text-xl text-gray-500 italic">Strapped White Tee - Medium</div>
                                <div className="text-xl text-gray-500 italic">Do Not Disturb Red Tee - Large</div>
                                <div className="text-xl text-gray-500 italic">Superiority Green Tee - Small</div>
                            </div>
                            <div className="w-3/12 flex justify-between items-center">
                                <div className="w-6/12 flex justify-center items-center">
                                    <div className="text-xl border-2 border-black rounded-xl px-3 py-1 inline-block">
                                        1
                                    </div>
                                </div>
                                <div className="w-6/12 text-center text-xl text-gray-500 italic">
                                    ₱1497.00
                                </div>
                            </div>
                            <div className="absolute top-4 right-4">
                                <button className="text-gray-500 font-bold text-xl">
                                    ✕
                                </button>
                            </div>
                        </div>


                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;

