import React, { useEffect } from "react";
import useShopStore from './shopStore'; // Adjust path as needed
import { useNavigate } from "react-router-dom";

function ShopPage2() {
    const navigate = useNavigate();
    const {
        currentPage,
        selectedFilter,
        showFilters,
        loading,
        error,
        filters,
        filteredProducts,
        setSelectedFilter,
        setShowFilters,
        fetchProducts,
        handlePrevPage,
        handleNextPage,
        getCurrentPageProducts,
        getTotalPages
    } = useShopStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    const ProductCard = ({ product }) => (
        <div 
            className="relative w-[13vw] h-[16.5vw] items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/product/${product.productID}`)}
        >
            <img src={product.imagePath} alt={product.name} className="absolute mx-auto z-1 w-full p-3 drop-shadow-lg"/>
            <div className="relative bg-gray-100 w-[13vw] h-[13vw]"></div>
            <div>
                <div className="text-sm text-zinc-400 leading-tight">T-Shirt</div>
                <div className="text-lg text-grey-400 leading-tight">{product.name}</div>
                <div className="text-sm italic text-zinc-400 leading-tight">₱{product.price}.00</div>
            </div>
        </div>
    );

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    const totalPages = getTotalPages();

    return (
        <div className="relative w-full mx-auto p-4">
            <div className="w-2/3 flex justify-between mx-auto">
                <div className="text-8xl p-3 px-0 my-auto">T-SHIRTS</div>
                <div className="relative text-2xl py-5 p-2 flex justify-center items-center">
                    {/* <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="border-2 rounded-full p-2 px-4 border-gray-600 flex items-center gap-4 hover:bg-gray-100"
                    >
                        <span className="material-symbols-outlined text-2xl">tune</span>
                        <span>Filters</span>
                    </button> */}
                      <div className="w-full mx-auto p-2 flex gap-4">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`text-xl border-2 p-2 rounded-lg transition-colors ${
                            selectedFilter === filter.ID 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
                </div>
            </div>

          

            <div className="w-2/3 mx-auto p-2 py-5 flex gap-3 justify-center">
                <button 
                    onClick={handlePrevPage}
                    className={`text-2xl border-1 px-1 border-gray-600 rounded-md ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentPage === 1}
                >
                    &lt;&lt;
                </button>
                <div className="text-2xl">PAGE {currentPage} OF {totalPages}</div>
                <button 
                    onClick={handleNextPage}
                    className={`text-2xl border-1 px-1 border-gray-600 rounded-md ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentPage === totalPages}
                >
                    &gt;&gt;
                </button>
            </div>

            <div className="relative w-2/3 mx-auto p-2 py-4 grid grid-cols-4 gap-10 justify-items-center">
                {getCurrentPageProducts().map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="w-2/3 mx-auto p-2 py-5 flex gap-3 justify-center">
                <button 
                    onClick={handlePrevPage}
                    className={`text-2xl border-1 px-1 border-gray-600 rounded-md ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentPage === 1}
                >
                    &lt;&lt;
                </button>
                <div className="text-2xl">PAGE {currentPage} OF {totalPages}</div>
                <button 
                    onClick={handleNextPage}
                    className={`text-2xl border-1 px-1 border-gray-600 rounded-md ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentPage === totalPages}
                >
                    &gt;&gt;
                </button>
            </div>

            <div className="w-2/3 mx-auto p-2 flex gap-3 justify-center">
                <img src="/page2banner.png" alt="banner" className="w-[65vw]"/>
            </div>
        </div>
    );
}

export default ShopPage2;