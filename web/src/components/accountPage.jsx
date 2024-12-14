import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AccountPage() {
    const { userId } = useParams(); // Get userId from URL
    const [userData, setUserData] = useState(null); // User data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token
                if (!token) throw new Error("Unauthorized");

                const response = await axios.get(`http://localhost:8590/user/${userId}`, {
                    headers: { Authorization: `${token}` },
                });
                setUserData(response.data); // Set user data
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message || "Failed to load user data.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [userId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission to update user data
    const handleSaveChanges = async () => {
        
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            await axios.put(`http://localhost:8590/user/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
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
                    <div className="flex flex-row gap-16 p-3 mx-auto">
                        <img src="alec.png" alt="alec" className="rounded-full w-[15vw]" />
                        <div className="my-auto">
                            <div className="text-7xl">{`${userData.userFirstName} ${userData.userLastName}`}</div>
                            <div className="text-4xl font-light text-gray-500">@{userData.username}</div>
                        </div>
                    </div>

                    <div className="bg-gray-200 w-full h-auto p-5 gap-7 flex flex-col rounded-xl">
                        <div>
                            <div className="text-lg font-semibold">Email Address</div>
                            <input
                                type="email"
                                name="email"
                                value={userData.email || ""}
                                onChange={handleInputChange}
                                className="p-2 w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Phone Number</div>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userData.phoneNumber || ""}
                                onChange={handleInputChange}
                                className="p-2 w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Address</div>
                            <input
                                type="text"
                                name="address"
                                value={userData.address || ""}
                                onChange={handleInputChange}
                                className="p-2 w-full rounded-xl"
                            />
                        </div>
                        <div className="flex flex-row w-full gap-7">
                            <div className="w-1/2">
                                <div className="text-lg font-semibold">City</div>
                                <input
                                    type="text"
                                    name="city"
                                    value={userData.city || ""}
                                    onChange={handleInputChange}
                                    className="p-2 w-full rounded-xl"
                                />
                            </div>
                            <div className="w-1/2">
                                <div className="text-lg font-semibold">Province</div>
                                <input
                                    type="text"
                                    name="province"
                                    value={userData.province || ""}
                                    onChange={handleInputChange}
                                    className="p-2 w-full rounded-xl"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSaveChanges}
                            className="bg-blue-500 text-white p-3 rounded-xl mt-5 hover:bg-blue-600 transition">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
