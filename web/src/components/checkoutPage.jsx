import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function CheckoutPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutError, setCheckoutError] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(null);
    const [userData, setUserData] = useState(null);

    

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (!localToken) {
            navigate('/loginPage');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const localToken = localStorage.getItem('token');

                const getUserResponse = await axios.get(`http://localhost:8590/user/validate/user`, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });

                setUserData(getUserResponse.data);
                // Sort addresses by isPrimary
                if (getUserResponse.data && getUserResponse.data.addresses && getUserResponse.data.addresses.length > 1) {
                    const sortedAddresses = getUserResponse.data.addresses.sort((a, b) => (a.isPrimary ? -1 : 1));
                    setUserData((prevData) => ({
                        ...prevData,
                        addresses: sortedAddresses,
                    }));
                }

                // Fetch shopping cart with items
                const response = await axios.get(`http://localhost:8590/shoppingCart/find`, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });

                const cart = response.data;
                setCartItems(cart.items);
                console.log(cartItems.length);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching cart items:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleButtonClick = (event) => {
        const button = event.currentTarget;
        button.classList.add("scale-95", "bg-gray-300");
        setTimeout(() => {
            button.classList.remove("scale-95", "bg-gray-300");
        }, 150);
    };

    const updateQuantity = async (itemId, increment) => {
        const item = cartItems.find(i => i.itemID === itemId);
        const newQuantity = item.quantity + increment;

        // Optimistically update the state
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.itemID === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        try {
            const localToken = localStorage.getItem('token');
            await axios.put(`http://localhost:8590/cartItem/edit/${itemId}`, 
                { quantity: newQuantity },
                {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                }
            );
        } catch (err) {
            console.error('Error updating quantity:', err);
            // Revert the state if the API call fails
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.itemID === itemId
                        ? { ...item, quantity: item.quantity - increment }
                        : item
                )
            );
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const localToken = localStorage.getItem('token');
            await axios.delete(`http://localhost:8590/cartItem/delete/${itemId}`, {
                headers: {
                    'Authorization': `${localToken}`,
                }
            });

            // Remove the item from the state
            setCartItems(prevItems => prevItems.filter(item => item.itemID !== itemId));
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const checkout = async () => {
        if(!userData.addresses || userData.addresses.length === 0) {
            setCheckoutError("No address found. Please add an address in your profile.");
            return;
        }

        try {
            const localToken = localStorage.getItem('token');
            const shippingAmount = 50.0; // Replace with actual shipping amount
            const paymentMethod = "Cash"; // Replace with actual payment method

            const orderResponse = await axios.post(`http://localhost:8590/order/add`, {
                addressID: userData.addresses[0].addressID,
                isPaid: false,
                shippingAmount: shippingAmount,
                paymentMethod: paymentMethod
            }, {
                headers: {
                    'Authorization': `${localToken}`,
                }
            });

            const orderID = orderResponse.data.orderID;
            
            for (const item of cartItems) {
                console.log({
                    orderID: orderID,
                    inventoryID: item.inventory.inventoryID,
                    quantity: item.quantity,
                    priceAtPurchase: item.inventory.product.price
                });
                await axios.post(`http://localhost:8590/orderItem/add`, {
                    orderID: orderID,
                    inventoryID: item.inventory.inventoryID,
                    quantity: item.quantity,
                    priceAtPurchase: parseFloat(item.inventory.product.price)
                }, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });

                await axios.delete(`http://localhost:8590/cartItem/delete/${item.itemID}`, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });
            }

            setCheckoutSuccess("Checkout successful!");
            setCartItems([]);
        } catch (err) {
            console.error('Error during checkout:', err);
            setCheckoutError(err.response?.data?.message || "Checkout failed");
        }
    };

    const getItemTotal = (quantity, price) => quantity * price;
    const totalCost = cartItems.reduce((sum, item) => 
        sum + getItemTotal(item.quantity, item.inventory.product.price), 0);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-screen bg-gray-200">
            <Header />
            <div className="relative  top-[5vh] md:top-[10vh] p-4 md:p-5 w-full h-auto drop-shadow-xl">
                <div className="absolute left-[50%]">
                <div className="absolute font-bold drop-shadow-2xl font-archivo-black text-[11vw] md:text-[11vw] tracking-tighter text-white"
                    style={{
                        top: cartItems.length === 0 ? "6%" : "12%",
                        left: "50%",
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        
                    }}>
                    CHECKOUT
                </div>
                </div>
    
                <div className="bg-white z-10 flex flex-col p-3 md:p-5 mx-[5%] md:mx-[10%] gap-3 md:gap-4 rounded-xl md:rounded-2xl relative top-[5vh] md:top-[12vh]">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-sm md:text-xl text-gray-500 italic">No items in shopping cart</div>
                    ) : (
                        <>
                            <div className="flex flex-row text-sm md:text-lg font-bold">
                                <div className="w-1/2">
                                    <div>Product</div>
                                </div>
                                <div className="w-1/2 flex justify-between">
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Total Price</div>
                                </div>
                            </div>
                            
                            {cartItems.map(item => (
                                <div key={item.itemID} className="relative bg-gray-200 p-3 md:p-4 rounded-lg md:rounded-xl h-auto flex flex-col md:flex-row gap-3">
                                    <button
                                        onClick={() => deleteItem(item.itemID)}
                                        className="absolute top-2 right-2 text-red-500 text-base md:text-xl"
                                    >
                                        ✕
                                    </button>
                                    <div className="w-full md:w-1/2 flex flex-row gap-2">
                                        <div className="relative w-[20vw] md:w-[12vw]">
                                            <img src={item.inventory.product.imagePath} alt={item.inventory.product.name} className="absolute p-2 md:p-3 rounded-lg md:rounded-3xl z-1 drop-shadow-lg w-full h-full object-cover" />
                                            <div className="bg-white w-[20vw] md:w-[12vw] h-[20vw] md:h-[12vw] rounded-lg md:rounded-xl"></div>
                                        </div>
                                        <div className="my-auto">
                                            <div className="text-sm md:text-lg text-gray-400">{item.inventory.product.category}</div>
                                            <div className="text-base md:text-3xl">{item.inventory.product.name} ({item.inventory.size.name})</div>
                                            <div className="text-xs md:text-sm">{item.inventory.product.description}</div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 flex justify-between">
                                        <div className="my-auto text-sm md:text-xl text-gray-500 italic">₱{parseFloat(item.inventory.product.price).toFixed(2)}</div>
                                        <div className="text-sm md:text-xl flex my-auto flex-row border-2 border-black rounded-lg md:rounded-xl">
                                            <button
                                                onClick={(e) => {
                                                    handleButtonClick(e);
                                                    updateQuantity(item.itemID, -1);
                                                }}
                                                className="p-1 px-2 rounded-l-lg md:rounded-l-xl border-black transition-all duration-150"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <div className="p-1 px-3 border-x-2 border-black">{item.quantity}</div>
                                            <button
                                                onClick={(e) => {
                                                    handleButtonClick(e);
                                                    updateQuantity(item.itemID, 1);
                                                }}
                                                className="p-1 px-2 rounded-r-lg md:rounded-r-xl border-black transition-all duration-150"
                                                disabled={item.quantity >= item.inventory.product.productQuantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="my-auto text-sm md:text-xl text-gray-500 italic">₱{getItemTotal(item.quantity, item.inventory.product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
    
                <div className="bg-white z-10 flex p-3 md:p-4 mx-[5%] md:mx-[10%] gap-2 md:gap-4 flex-col md:flex-row justify-between rounded-lg md:rounded-2xl relative top-[12vh] md:top-[15vh]">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                        <div className="text-sm md:text-xl">Total Cost: </div>
                        <div className="text-3xl md:text-6xl">₱{totalCost.toFixed(2)}</div>
                    </div>
                    <button onClick={checkout} 
                        className={`bg-gray-200 w-full md:w-[18vw] p-2 md:p-3 text-sm md:text-2xl rounded-lg md:rounded-xl transition-opacity duration-150 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={cartItems.length === 0}
                    >
                        Checkout
                    </button>
                </div>
    
                {checkoutError && (
                    <div className="text-red-500 text-center mt-2 text-xs md:text-sm">
                        {checkoutError}
                    </div>
                )}
                {checkoutSuccess && (
                    <div className="text-green-500 text-center mt-2 text-xs md:text-sm">
                        {checkoutSuccess}
                    </div>
                )}
            </div>
        </div>
    );
    
    
}

export default CheckoutPage;