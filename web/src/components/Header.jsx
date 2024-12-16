import React, { useEffect, useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsAuthenticated(!!storedToken);  // Check if user is authenticated

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
                    setCartItems(cart.items);
                    console.log(cartItems.length);
                } catch (err) {
                    setError(err.message);
                    console.error('Error fetching cart items:', err);
                }
            };
    
            fetchCartItems();
  }, []);

  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate("/frontPage");
    } else {
      navigate("/loginPage");
    }
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShirtCatalogClick = () => {
    if (location.pathname === "/frontPage") {
      scroller.scrollTo("shirtCatalog", {
        smooth: true,
        duration: 500,
        offset: -150,
      });
    } else {
      navigate("/frontPage");
      setTimeout(() => {
        scroller.scrollTo("shirtCatalog", {
          smooth: true,
          duration: 500,
          offset: -150,
        });
      }, 500);
    }
  };

  const handleShirtCatalogClick2 = () => {
    if (location.pathname === "/frontPage") {
      scroller.scrollTo("Footer", {
        smooth: true,
        duration: 500,
        offset: 0,
      });
    } else {
      navigate("/frontPage");
      setTimeout(() => {
        scroller.scrollTo("Footer", {
          smooth: true,
          duration: 500,
          offset: 0,
        });
      }, 500);
    }
  };

  // Handle Profile button click to navigate to login if user is not authenticated
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate(`/accountPage/${userId}`);  // Navigate to profile page if authenticated
    } else {
      navigate("/loginPage");  // Navigate to login page if not authenticated
    }
  };

  const handleViewOrders = () => {
    navigate("/ordersPage");
    setShowDropdown(false);
  }

  return (
    <div className="w-full z-50">
      <header className="bg-[#f4f2f2] flex justify-between items-center w-[100vw] p-6 h-2 sm:h-[2vw] md:h-[3vw] lg:h-[4vw] xl:h-[4vw] 2xl:h-[5vw] ">
        <Link to="/frontPage" className="cursor-pointer hover:scale-105 z-50">
          <img src="/logo.png" alt="Logo" className="w-[20vw] sm:w-[8vw] md:w-[9vw] lg:w-[9vw] xl:w-[9vw] 2xl:w-[10vw]" />
        </Link>

        <div className="flex items-center space-x-8 z-50">
          <button onClick={handleShirtCatalogClick} className="cursor-pointer font-bold text-[1.35rem] p-4 tracking-wider no-underline text-black hover:text-gray-600 hover:scale-105 sm:text-[1.15rem] md:text-[1.20rem] lg:text-[1.25rem] xl:text-[1.30rem] 2xl:text-[1.35rem]">
            SHIRT CATALOG
          </button>
          <Link to="/shopPage" className="cursor-pointer font-bold text-[1.35rem] p-4 tracking-wider no-underline text-black hover:text-gray-600 hover:scale-105 sm:text-[1.15rem] md:text-[1.20rem] lg:text-[1.25rem] xl:text-[1.30rem] 2xl:text-[1.35rem]">
            SHOP
          </Link>
          <button onClick={handleShirtCatalogClick2} className="cursor-pointer font-bold text-[1.35rem] p-4 tracking-wider no-underline text-black hover:text-gray-600 hover:scale-105 sm:text-[1.15rem] md:text-[1.20rem] lg:text-[1.25rem] xl:text-[1.30rem] 2xl:text-[1.35rem]">
            ABOUT
          </button>
        </div>

        <div className="flex items-center space-x-4 z-50">
          <div className="relative">
            {showSearch && (
              <div
                className="absolute bg-white border border-gray-300 shadow-sm rounded-md p-1 w-[300px] z-50"
                style={{ top: "50%", right: "4.5vw", transform: "translateY(-50%)" }}
              >
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            )}
          </div>

          <Link to="/checkoutPage" className="relative">
            <span className="material-symbols-outlined text-[3rem] font-extrabold cursor-pointer hover:scale-105 sm:text-[2rem] md:text-[2rem] lg:text-[2.3rem] xl:text-[2.85rem] 2xl:text-[3rem] sm:p-1.2 md:p-1.4 lg:p-1.6 xl:p-1.8m xl:p-2">
              shopping_bag
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] xl:text-[0.75rem] 2xl:text-[0.75rem] w-6 h-6 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </span>
          </Link>

          <div className="relative">
            <span 
              onClick={toggleDropdown}
              className="material-symbols-outlined text-[3rem] font-extrabold cursor-pointer hover:scale-105 sm:text-[2rem] md:text-[2rem] lg:text-[2.3rem] xl:text-[2.85rem] 2xl:text-[3rem] sm:p-1.2 md:p-1.4 lg:p-1.6 xl:p-1.8m xl:p-2 pr-0"
            >
              more_vert
            </span>
            
            {showDropdown && (
              <div className="absolute right-5 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {isAuthenticated && (<>
                  <button 
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </button>
                  <button 
                  onClick={handleViewOrders}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  View Orders
                </button>
                </>)}
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleAuthAction}
                >
                  {isAuthenticated ? "Sign out" : "Sign in"}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
