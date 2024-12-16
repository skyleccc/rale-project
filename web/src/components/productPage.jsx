import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

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
        const fetchUserData = async () => {
            try {
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
                const response = await axios.get(`http://localhost:8590/product/${productId}`);
                setSelectedProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchRecommendedProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8590/product`);
                const products = response.data;
                setRecommendedProducts(products.filter(product => product.productID !== parseInt(productId)).slice(0, 8));
            } catch (err) {
                console.error('Error fetching recommended products:', err);
            }
        };

        fetchUserData();
        fetchProductDetails();
        fetchRecommendedProducts();
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

                await axios.put(`http://localhost:8590/cartItem/edit/${existingItem.itemID}`, {
                    quantity: existingItem.quantity + 1,
                }, {
                    headers: {
                        'Authorization': `${localToken}`,
                    }
                });
                console.log("Product already in cart. Quantity increased.");
            } else {
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
        <div className="bg-gray-200">
            <Header />
            <div className="w-full h-screen bg-gray-200 p-4 md:p-10">
                <div className="bg-white rounded-2xl">
                    <div className="p-3">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-4">
                            <div className="bg-gray-200 w-full md:w-[40vw] h-full md:h-[40vw] rounded-xl">
                                <img 
                                    src={selectedProduct.imagePath} 
                                    alt={selectedProduct.name} 
                                    className="p-4 drop-shadow-xl"
                                />
                            </div>
    
                            <div className="flex flex-row md:flex-col gap-2 md:gap-4 overflow-auto">
                                {selectedProduct.thumbnails?.map((thumb, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-200 w-[15vw] h-[15vw] md:w-[11vw] md:h-[11vw] rounded-lg md:rounded-xl flex-shrink-0"
                                    >
                                        <img 
                                            src={thumb} 
                                            alt={`${selectedProduct.name} thumbnail`} 
                                            className="p-2 md:p-3 drop-shadow-xl w-full h-full object-cover rounded-lg md:rounded-xl"
                                        />
                                    </div>
                                ))}
                            </div>
    
                            <div className="hidden md:block bg-gray-400 w-[0.2vw] h-auto" />
    
                            <div className="flex flex-col py-4 md:py-10 w-full md:w-1/2 ">
                                <div className="my-auto">
                                <div className="text-lg md:text-2xl text-gray-500">{selectedProduct.category}</div>
                                <div className="text-3xl md:text-6xl text-black">{selectedProduct.name}</div>
    
                                <div className="text-yellow-300 p-1 gap-1 flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <span 
                                            key={i} 
                                            className="material-symbols-outlined text-2xl md:text-4xl"
                                        >
                                            star_rate
                                        </span>
                                    ))}
                                    <div className="text-gray-300 text-sm md:text-xl py-1">
                                        {selectedProduct.ratings} Ratings | {selectedProduct.sold} Sold
                                    </div>
                                </div>
    
                                <div className="text-2xl md:text-5xl text-gray-400 italic">₱{selectedProduct.price}.00</div>
    
                                <div className="w-full md:w-full p-2 md:p-3 flex flex-wrap gap-2 justify-center md:justify-between">
                                    {Object.keys(sizeMapping).map((size) => (
                                        <div 
                                            key={size}
                                            className={`text-base md:text-3xl p-2 w-[11vw] h-[12vw] md:w-[4vw] md:h-[3.54vw] grid justify-items-center rounded-lg cursor-pointer transition-colors ${
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
    
                                {cartError && (
                                    <div className="text-red-500 text-center mt-2 text-sm md:text-base">
                                        {cartError}
                                    </div>
                                )}
    
                                <div className="w-full h-auto p-2 md:p-3 mx-auto">
                                    <button 
                                        className={`text-base md:text-3xl p-2 md:p-3 rounded-lg md:rounded-2xl w-full transition-colors ${
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
    
                <div className="hidden md:block bg-white z-1 rounded-xl md:rounded-2xl my-4 p-4">
                    <div className="text-xl md:text-3xl mb-4">Recommended For You</div>
    
                    <div className="p-3 relative">   
                        <div className="relative p-2 md:p-3 rounded-lg md:rounded-xl border-2 border-gray-200 overflow-auto flex flex-row gap-3">
                            {recommendedProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Define the ProductCard component
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div 
            className="relative w-[40vw] md:w-[13vw] h-[40vw] md:h-[16.5vw] items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/product/${product.productID}`)}
        >
            <img src={product.imagePath} alt={product.name} className="absolute mx-auto z-1 w-full p-3 drop-shadow-lg"/>
            <div className="relative bg-gray-100 w-[40vw] md:w-[13vw] h-[40vw] md:h-[13vw]"></div>
            <div>
                <div className="text-sm text-zinc-400 leading-tight">T-Shirt</div>
                <div className="text-sm md:text-lg text-grey-400 leading-tight">{product.name}</div>
                <div className="text-sm italic text-zinc-400 leading-tight">₱{product.price}.00</div>
            </div>
        </div>
    );
};

export default ProductPage;