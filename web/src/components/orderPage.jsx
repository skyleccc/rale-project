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
        <div className=" bg-gray-300 min-h-screen w-screen">
            <Headers />

            <div className="w-screen h-full bg-gray-300 p-5">
                <h1 className="text-3xl font-bold mb-5">Your Orders</h1>
                {orders.length === 0 ? (
                    <div>No orders found.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {orders.map((order) => (
                            <div key={order.orderID} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold">Order #{order.orderID}</h2>
                                <p>Date Ordered: {new Date(order.dateOrdered).toLocaleDateString()}</p>
                                <p>Status: {order.status}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <p>Shipping Amount: ${parseFloat(order.shippingAmount).toFixed(2)}</p>
                                <p>Total: ${order.items.reduce((total, item) => total + parseFloat(item.priceAtPurchase) * item.quantity, 0).toFixed(2)}</p>
                                <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
                                <div>
                                    <h3 className="font-semibold">Shipping Address:</h3>
                                    <p>{order.address.street}, {order.address.city}, {order.address.zipCode}</p>
                                    <p>Address Type: {order.address.category}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Items:</h3>
                                    <ul className="list-disc list-inside">
                                        {order.items.map((item) => (
                                            <li key={item.itemID}>
                                                Item ID: {item.inventoryID} - ${parseFloat(item.priceAtPurchase).toFixed(2)} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
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