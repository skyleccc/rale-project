import React from "react";


function AccountPage() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="relative bg-gray-200 p-10 w-full h-full">
                <div
                    className="absolute font-bold font-archivo-black text-[11vw] tracking-tighter text-white"
                    style={{
                        top: "12%",
                        left: "49%",
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        whiteSpace: "nowrap",
                    }}>
                    ACCOUNT
                </div>

                <div className="bg-white z-10 flex flex-col p-5 mx-[10%] gap-4 rounded-2xl relative top-[11vh] h-auto">
                    <div className="flex flex-row gap-16 p-3 mx-auto">
                        <img src="alec.png" alt="alec" className="rounded-full w-[15vw]" />
                        <div className=" my-auto">
                            <div className="text-7xl">Justin Alec Antonio</div>
                            <div className="text-4xl font-light text-gray-500">@alec_69</div>
                        </div>
                    </div>

                    <div className="bg-gray-200 w-full h-auto p-5 gap-7 flex flex-col rounded-xl">
                        <div>
                            <div className="text-lg font-semibold">email address</div>
                            <input type="text" placeholder="Username" name="email" className="p-2 w-full rounded-xl"></input>
                        </div>
                        <div>
                            <div className="text-lg font-semibold">phone number</div>
                            <input type="text" placeholder="Phone Number" name="pnum" className="p-2 w-full rounded-xl"></input>
                        </div>
                        <div>
                            <div className="text-lg font-semibold">address</div>
                            <input type="text" placeholder="Address" name="address" className="p-2 w-full rounded-xl"></input>
                        </div>
                        <div className="flex flex-row w-full gap-7">
                            <div className=" w-1/2">
                                <div className="text-lg font-semibold">city</div>
                                <input type="text" placeholder="City" name="city" className="p-2 w-full rounded-xl"></input>
                            </div>
                            <div className="w-1/2 ">
                                <div className="text-lg font-semibold">province</div>
                                <input type="text" placeholder="Province" name="province" className="p-2 w-full rounded-xl"></input>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AccountPage;
