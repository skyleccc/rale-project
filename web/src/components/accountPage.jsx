import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AccountPage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Unauthorized");

                const response = await axios.get(`http://localhost:8590/user/${userId}`, {
                    headers: { Authorization: `${token}` },
                });
                setUserData(response.data);
                setTempData(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message || "Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const tokenedit = localStorage.getItem("token");
            if (!tokenedit) throw new Error("Unauthorized");

        

            await axios.put(`http://localhost:8590/user/editDetails/${userId}`, 
            {
                email: tempData.email,
                username:tempData.username,
                userFirstName: tempData.userFirstName,
                userLastName: tempData.userLastName,
                phoneNumber: tempData.phoneNumber
            },
             {
                headers: { Authorization: `${tokenedit}` },
            });
            setUserData(tempData);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const handleCancel = () => {
        setTempData(userData);
        setIsEditing(false);
    };

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

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
                    <div className="flex justify-end">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row gap-16 p-3 mx-auto">
                        <img src="alec.png" alt="alec" className="rounded-full w-[15vw]" />
                        <div className="my-auto">
                            <div className="text-7xl">
                                {userData.userFirstName} {userData.userLastName}
                            </div>
                            <div className="text-4xl font-light text-gray-500">@{userData.username}</div>
                        </div>
                    </div>

                    <div className="bg-gray-200 w-full h-auto p-5 gap-7 flex flex-col rounded-xl">
                        <div>
                            <div className="text-lg font-semibold">First Name</div>
                            <input
                                type="text"
                                name="userFirstName"
                                value={isEditing ? tempData.userFirstName || "" : userData.userFirstName || ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Last Name</div>
                            <input
                                type="text"
                                name="userLastName"
                                value={isEditing ? tempData.userLastName || "" : userData.userLastName || ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Username</div>
                            <input
                                type="text"
                                name="username"
                                value={isEditing ? tempData.username || "" : userData.username || ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Email Address</div>
                            <input
                                type="email"
                                name="email"
                                value={isEditing ? tempData.email || "" : userData.email || ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Phone Number</div>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={isEditing ? tempData.phoneNumber || "" : userData.phoneNumber || ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;