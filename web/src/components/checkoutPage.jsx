import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const localToken = localStorage.getItem('token');

                // Fetch shopping cart with items
                const response = await axios.get(`http://localhost:8590/shoppingCart/find`, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });

                const cart = response.data;
                console.log(cart);
                setCartItems(cart.items);
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

    const getItemTotal = (quantity, price) => quantity * price;
    const totalCost = cartItems.reduce((sum, item) => 
        sum + getItemTotal(item.quantity, item.inventory.product.price), 0);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-screen">
            <Header />
            <div className="relative bg-gray-200 p-5 w-full h-auto drop-shadow-xl">
                <div className="absolute font-bold drop-shadow-2xl font-archivo-black text-[11vw] tracking-tighter text-white"
                    style={{
                        top: "15%",
                        left: "49%",
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        whiteSpace: "nowrap",
                    }}>
                    CHECKOUT
                </div>

                <div className="bg-white z-10 flex flex-col p-5 mx-[10%] gap-4 rounded-2xl relative top-[12vh]">
                    <div className="flex flex-row text-lg">
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
                        <div key={item.itemID} className="relative bg-gray-200 p-4 rounded-xl h-auto flex flex-row">
                            <button
                                onClick={() => deleteItem(item.itemID)}
                                className="absolute top-2 right-2 text-red-500 text-xl"
                            >
                                ✕
                            </button>
                            <div className="w-1/2 flex gap-3 flex-row">
                                <div className="relative w-[12vw]">
                                    <img src={item.inventory.product.imagePath} alt={item.inventory.product.name} className="absolute p-3 rounded-3xl z-1 drop-shadow-lg" />
                                    <div className="bg-white w-[12vw] h-[12vw] rounded-xl"></div>
                                </div>
                                <div className="my-auto">
                                    <div className="text-lg text-gray-400">{item.inventory.product.category}</div>
                                    <div className="text-3xl">{item.inventory.product.name}</div>
                                    <div className="">{item.inventory.product.description}</div>
                                </div>
                            </div>
                            <div className="w-1/2 flex justify-between">
                                <div className="my-auto text-xl text-gray-500 italic">₱{item.inventory.product.price}</div>
                                <div className="text-xl flex my-auto flex-row border-2 border-black rounded-xl">
                                    <button
                                        onClick={(e) => {
                                            handleButtonClick(e);
                                            updateQuantity(item.itemID, -1);
                                        }}
                                        className="border-y-1 p-1 px-2 rounded-xl border-black transition-all duration-150"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <div className="border-1 p-1 px-3 border-black">{item.quantity}</div>
                                    <button
                                        onClick={(e) => {
                                            handleButtonClick(e);
                                            updateQuantity(item.itemID, 1);
                                        }}
                                        className="border-y-1 p-1 px-2 rounded-xl border-black transition-all duration-150"
                                        disabled={item.quantity >= item.inventory.product.productQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="my-auto text-xl text-gray-500 italic">₱{getItemTotal(item.quantity, item.inventory.product.price)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white z-10 flex p-4 mx-[10%] gap-4 flex-row justify-between rounded-2xl relative top-[15vh]">
                    <div className="flex flex-row gap-4">
                        <div className="text-xl my-auto">Total Cost: </div>
                        <div className="text-6xl my-auto">₱{totalCost}</div>
                    </div>
                    <button onClick={handleButtonClick} className="bg-gray-200 w-[18vw] my-auto grid justify-items-center p-3 text-2xl rounded-xl">Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;