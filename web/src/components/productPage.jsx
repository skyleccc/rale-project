import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useShopStore from './shopStore';
import Header from "./Header"; // Adjust path as needed

function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartError, setCartError] = useState(null);
    const [cartDetails, setcartDetails] = useState({});
    

    // Assuming your store has a method to get recommended products
    const { getRecommendedProducts } = useShopStore();
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const sizeMapping = {
        S: 1,
        M: 2,
        L: 3,
        XL: 4,
        "2XL": 5,
        "3XL": 6,
    };

    useEffect(() => {
        
        console.log("Product ID:", productId);
        const fetchUserData = async () => {
            try {
                // Get user ID from localStorage or auth system
                const localToken = localStorage.getItem('token');
                if (!localToken) {
                    return;
                }

                const getUserResponse = await axios.get(`http://localhost:8590/user/validate/user`, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });

                if(getUserResponse.status === 200){
                    const getCartResponse = await axios.get(`http://localhost:8590/shoppingCart/find`, {
                        headers: {
                            'Authorization': `${localToken}`,
                        }
                    });
                 
                    if(getCartResponse.status === 200){
                        setcartDetails(getCartResponse.data);
                        console.log(getCartResponse.data);
                    }
                }
            } catch (err) {
                console.error('Error fetching user cart:', err);
            }
        };
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                // Axios API call for product details
                const response = await axios.get(`http://localhost:8590/product/${productId}`);
                setSelectedProduct(response.data);

                // Fetch recommended products
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            setCartError("Please select a size");
            return;
        }
        
        const localToken = localStorage.getItem('token');
        if (!localToken) {
            navigate('/loginPage');
            return;
        }

        try {
            setAddingToCart(true);
            setCartError(null);

            if (!cartDetails || !cartDetails.items) {
                throw new Error("Cart details not loaded");
            }

            const existingItem = cartDetails.items.find(item => 
                item.inventory.productID === selectedProduct.productID && 
                item.inventory.sizeID === sizeMapping[selectedSize]
            );

            if (existingItem) {
                console.log(existingItem.itemID);
                // Increment quantity if item already exists
                await axios.put(`http://localhost:8590/cartItem/edit/${existingItem.itemID}`, {
                    quantity: existingItem.quantity + 1,
                }, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });
                console.log("Product already in cart. Quantity increased.");
            } else {
                // Add new item to cart
                await axios.post(`http://localhost:8590/cartItem/add`, {
                    cartID: cartDetails.cartID,
                    productID: selectedProduct.productID,
                    sizeID: sizeMapping[selectedSize],
                    quantity: 1, // You can add quantity selection if needed
                }, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });
                console.log("Product added to cart.");
            }

            // Optional: Show success message or trigger cart update
            // You could add a toast notification here
        } catch (err) {
            setCartError(err.response?.data?.message || "Failed to add item to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!selectedProduct) return <div className="flex justify-center items-center h-screen">Product not found</div>;

    return (
        <div>
            <Header />
            <div className="w-full h-auto bg-gray-200 p-10">
                {/* Main Product Display */}
                <div className="bg-white rounded-2xl">
                    <div className="p-5">
                        <div className="flex gap-4">
                            {/* Main Image */}
                            <div className="bg-gray-200 w-[40vw] h-[40vw] rounded-xl">
                                <img 
                                    src={selectedProduct.imagePath} 
                                    alt={selectedProduct.name} 
                                    className="p-4 drop-shadow-xl"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="flex flex-col gap-4">
                                {selectedProduct.thumbnails?.map((thumb, index) => (
                                    <div key={index} className="bg-gray-200 w-[11vw] h-[11vw] rounded-xl">
                                        <img 
                                            src={thumb} 
                                            alt={`${selectedProduct.name} thumbnail`} 
                                            className="p-3 drop-shadow-xl"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-400 w-[0.2vw] h-auto" />

                            {/* Product Details */}
                            <div className="flex flex-col py-10">
                                <div className="text-2xl text-gray-500">{selectedProduct.category}</div>
                                <div className="text-6xl text-black">{selectedProduct.name}</div>

                                <div className="text-yellow-300 p-1 gap-1 flex align-middle">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-4xl">star_rate</span>
                                    ))}
                                    <div className="text-gray-300 text-xl py-1">
                                        {selectedProduct.ratings && "/5" || "No"} Ratings | {selectedProduct.sold} Sold
                                    </div>
                                </div>

                                <div className="text-5xl text-gray-400 italic">₱{selectedProduct.price}.00</div>

                                {/* Sizes */}
                                <div className="w-5/6 h-1/6 p-3 flex flex-row justify-between mx-auto">
                                    {Object.keys(sizeMapping).map((size) => (
                                        <div 
                                            key={size}
                                            className={`text-3xl p-2 w-[3.5vw] h-[3.54vw] grid justify-items-center rounded-lg cursor-pointer transition-colors ${
                                                selectedSize === size 
                                                    ? 'bg-gray-600 text-white' 
                                                    : 'bg-gray-400 text-white hover:bg-gray-500'
                                            }`}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setCartError(null);
                                            }}
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>

                                {/* Error Message */}
                                {cartError && (
                                    <div className="text-red-500 text-center mt-2">
                                        {cartError}
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <div className="w-full h-2/6 p-3 mx-auto">
                                    <button 
                                        className={`text-3xl p-3 rounded-2xl w-full transition-colors ${
                                            addingToCart 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                    >
                                        {addingToCart ? 'ADDING TO CART...' : 'ADD TO CART'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default ProductPage;