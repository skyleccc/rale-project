import React, { useState, useEffect } from "react";
import axios from "axios";
import Headers from "./Header.jsx";

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Unauthorized");

                const response = await axios.get(`http://localhost:8590/order`, {
                    headers: { Authorization: `${token}` },
                });

                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.message || "Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-300 min-h-screen w-screen">
            <Headers />
    
            <div className="w-screen h-auto p-5">
                <h1 className="text-3xl font-bold mb-5">Your Orders</h1>
                {orders.length === 0 ? (
                    <div className="text-center text-sm md:text-lg text-gray-500 italic">No orders found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <div
                                key={order.orderID}
                                className="bg-white p-6 md:p-8 rounded-lg shadow-md md:shadow-lg"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">Order #{order.orderID}</h2>
                                <p className="text-gray-600 mb-2">
                                    Date Ordered: {new Date(order.dateOrdered).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 mb-2">Status: {order.status}</p>
                                <p className="text-gray-600 mb-2">Payment Method: {order.paymentMethod}</p>
                                <p className="text-gray-600 mb-2">
                                    Shipping Amount: ${parseFloat(order.shippingAmount).toFixed(2)}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    Total: $
                                    {order.items
                                        .reduce(
                                            (total, item) =>
                                                total +
                                                parseFloat(item.priceAtPurchase) * item.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                                </p>
                                <p className="text-gray-600 mb-2">Paid: {order.isPaid ? "Yes" : "No"}</p>
                                <div className="mb-4">
                                    <h3 className="font-semibold">Shipping Address:</h3>
                                    <p>
                                        {order.address.street}, {order.address.city},{" "}
                                        {order.address.zipCode}
                                    </p>
                                    <p>Address Type: {order.address.category}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Items:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.itemID}
                                                className="bg-gray-100 p-4 rounded-lg shadow-sm"
                                            >
                                                <img
                                                    src={item.inventory.product.imagePath}
                                                    alt={item.inventory.product.name}
                                                    className="w-full h-32 object-cover rounded-md mb-2"
                                                />
                                                <h4 className="font-bold text-sm md:text-lg">
                                                    {item.inventory.product.name}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    Price: ${parseFloat(item.priceAtPurchase).toFixed(2)}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Total: $
                                                    {(parseFloat(item.priceAtPurchase) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default OrderPage;