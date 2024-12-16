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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        zipCode: "",
        category: "",
        isPrimary: false,
    });
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Unauthorized");

                const response = await axios.get(`http://localhost:8590/user/${userId}`, {
                    headers: { Authorization: `${token}` },
                });

                if(!response.data) throw new Error("User not found");

                const userDataSortedAddresses = {
                    ...response.data,
                    addresses: response.data.addresses.sort((a, b) => (a.isPrimary ? -1 : 1)),
                };
                setUserData(userDataSortedAddresses);
                setTempData(userDataSortedAddresses);

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
        setTempData((prevData) => ({
            ...prevData,
            [name]: name === "isPrimary" ? value === "Yes" : value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const tokenedit = localStorage.getItem("token");
            if (!tokenedit) throw new Error("Unauthorized");

            // Update user details
            await axios.put(`http://localhost:8590/user/editDetails/${userId}`, 
            {
                email: tempData.email,
                username: tempData.username,
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setNewAddress({
            street: "",
            city: "",
            zipCode: "",
            category: "",
            isPrimary: false,
        });
        setIsModalOpen(false);
    };

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
        console.log(newAddress);
    };


    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            const response = await axios.post(`http://localhost:8590/address/add`, {
                ...newAddress,
                userID: userId,
            }, {
                headers: { Authorization: `${token}` },
            });

            setUserData((prevData) => ({
                ...prevData,
                addresses: [...prevData.addresses, response.data],
            }));

            setNewAddress({
                street: "",
                city: "",
                zipCode: "",
                category: "",
                isPrimary: false,
            });

            closeModal();
        } catch (err) {
            console.error("Error adding address:", err);
        }
    };

    const handleEditAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            const response = await axios.put(`http://localhost:8590/address/edit/${selectedAddress.addressID}`, {
                ...newAddress,
                userID: userId,
            }, {
                headers: { Authorization: `${token}` },
            });

            setUserData((prevData) => ({
                ...prevData,
                addresses: prevData.addresses.map((address) =>
                    address.addressID === selectedAddress.addressID ? response.data : address
                ),
            }));

            setNewAddress({
                street: "",
                city: "",
                zipCode: "",
                category: "",
                isPrimary: false,
            });

            closeModal();
        } catch (err) {
            console.error("Error editing address:", err);
        }
    };

    const handleDeleteAddress = async (addressID) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            await axios.delete(`http://localhost:8590/address/delete/${addressID}`, {
                headers: { Authorization: `${token}` },
            });

            setUserData((prevData) => ({
                ...prevData,
                addresses: prevData.addresses.filter((address) => address.addressID !== addressID),
            }));
        } catch (err) {
            console.error("Error deleting address:", err);
        }
    };

    const handleSetPrimaryAddress = async (addressID) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");
    
            console.log(addressID);
    
            const response = await axios.put(`http://localhost:8590/address/setPrimary/${addressID}`, {}, {
                headers: { Authorization: `${token}` },
            });
    
            setUserData((prevData) => {
                const updatedAddresses = prevData.addresses.map((address) =>
                    address.addressID === addressID ? { ...address, isPrimary: true } : { ...address, isPrimary: false }
                );
    
                // Sort addresses by isPrimary
                updatedAddresses.sort((a, b) => (a.isPrimary ? -1 : 1));
    
                return {
                    ...prevData,
                    addresses: updatedAddresses,
                };
            });
        } catch (err) {
            console.error("Error setting primary address:", err);
        }
    };

    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsPasswordModalOpen(false);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(passwordData);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            alert("New password must be at least 8 characters long");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            await axios.put(`http://localhost:8590/user/editPassword/${userId}`, {
                email: userData.email,
                password: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            }, {
                headers: { Authorization: `${token}` },
            });

            alert("Password changed successfully");
            closePasswordModal();
        } catch (err) {
            console.error("Error changing password:", err);
            alert("Error changing password");
        }
    };

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-200 w-full h-full overflow-hidden z-0">
            <div className="relative p-0 md:p-4 w-full min-h-screen"> {/* Adjusted padding for mobile */}
                {/* <div
                    className="absolute font-bold font-archivo-black  text-[15vw] sm:text-[11vw] tracking-tighter text-white" // Changed for mobile view
                    style={{
                        top: "12%",
                        left: "50%", // Centered text horizontally on mobile
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        whiteSpace: "nowrap",
                    }}>
                    ACCOUNT
                </div> */}
    
                <div className="bg-white z-10 flex flex-col p-2 md:p-5 mb-[5%] mx-[5%] sm:mx-[10%] gap-4 rounded-2xl relative top-[5vh] h-auto"> {/* Adjusted margin for mobile */}
                    <div className="flex flex-col sm:flex-row gap-16 p-3 mx-auto"> {/* Adjusted for mobile flex column */}
                        <div className="my-auto">
                            <div className="text-3xl md:text-7xl"> {/* Adjusted text size for mobile */}
                                {userData.userFirstName} {userData.userLastName}
                            </div>
                            <div className="text-2xl sm:text-4xl font-light text-gray-500">@{userData.username}</div> {/* Adjusted text size for mobile */}
                        </div>
                    </div>
    
                    <div className="bg-gray-200 w-full h-auto p-5 gap-7 flex flex-col rounded-xl">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-2xl sm:text-3xl">Account Details</div> {/* Adjusted text size for mobile */}
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-1/2 md:w-1/6 sm:w-auto"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveChanges}
                                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                        <hr />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="text-lg font-semibold">First Name</div>
                                <input
                                    type="text"
                                    name="userFirstName"
                                    value={tempData.userFirstName || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-300 cursor-not-allowed"}`}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-semibold">Last Name</div>
                                <input
                                    type="text"
                                    name="userLastName"
                                    value={tempData.userLastName || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-300 cursor-not-allowed"}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="text-lg font-semibold">Username</div>
                                <input
                                    type="text"
                                    name="username"
                                    value={tempData.username || ""}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    className={`p-2 w-full rounded-xl bg-gray-300 ${!isEditing && "cursor-not-allowed"}`}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-semibold">Email Address</div>
                                <input
                                    type="email"
                                    name="email"
                                    value={tempData.email || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-300 cursor-not-allowed"}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="text-lg font-semibold">Phone Number</div>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={tempData.phoneNumber || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`p-2 w-full rounded-xl ${!isEditing && "bg-gray-300 cursor-not-allowed"}`}
                                />
                            </div>
                            <div className="flex-1 justify-start gap-4 mt-4">
                                <button
                                    onClick={openPasswordModal}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
    
                    <div className="bg-gray-200 w-full h-auto p-5 gap-7 flex flex-col rounded-xl">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-2xl sm:text-3xl">Stored Addresses</div> {/* Adjusted text size for mobile */}
                            <button
                                onClick={openModal}
                                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-1/2 md:w-1/6 sm:w-auto"
                            >
                                Add Address
                            </button>
                        </div>
                        <hr />
    
                        {userData.addresses.map((address) => (
                            <div key={address.addressID} className={`w-full h-auto p-5 gap-7 rounded-lg flex justify-between items-center ${address.isPrimary ? 'bg-white' : 'bg-gray-100'}`}>
                                <div>
                                    <div className="font-bold text-lg">{address.isPrimary ? "Primary Address" : "Alternate Address"}</div>
                                    <div>{address.street}, {address.city}, {address.zipCode}</div>
                                    <div>{address.country}</div>
                                    <div>{address.category}</div>
                                </div>
                                <div className="flex gap-2">
                                    {!address.isPrimary && (
                                        <button
                                            onClick={() => handleSetPrimaryAddress(address.addressID)}
                                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
                                        >
                                            Set as Primary
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setNewAddress(address);
                                            openModal();
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                                    >
                                        Edit
                                    </button>
                                    {!address.isPrimary && (
                                        <button
                                            onClick={() => handleDeleteAddress(address.addressID)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-10 w-[90%] max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{selectedAddress ? "Edit Address" : "Add Address"}</h2>
                        <form onSubmit={selectedAddress ? handleEditAddress : handleAddAddress}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                                    Street
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={newAddress.street}
                                    onChange={handleNewAddressChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={newAddress.city}
                                    onChange={handleNewAddressChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={newAddress.zipCode}
                                    onChange={handleNewAddressChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                    Address Type
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={newAddress.category}
                                    onChange={handleNewAddressChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Select Address Type</option>
                                    <option value="HOME">Home</option>
                                    <option value="OFFICE">Office</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    {selectedAddress ? "Save Changes" : "Add Address"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    
            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-10 w-[90%] max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                        <form onSubmit={handleChangePassword}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.password}
                                    onChange={handlePasswordChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    
        </div>
    );
    
}

export default AccountPage;