import React, { useEffect, useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!storedToken);
  }, []);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/frontPage");
    } else {
      navigate("/loginPage");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  const handleProfileClick = () => {
    const userId = localStorage.getItem("userId");
    if (isAuthenticated) {
      navigate(`/accountPage/${userId}`);
    } else {
      navigate("/loginPage");
    }
  };

  return (
    <div className="w-full z-[100]">
      <header className="bg-[#f4f2f2] flex justify-between items-center p-6 w-full h-16 relative">
        {/* Logo */}
        <Link to="/frontPage" className="cursor-pointer absolute left-6">
          <img src="/logo.png" alt="Logo" className="w-[20vw] sm:w-[10vw] md:w-[8vw]" />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center space-x-8 justify-center w-full">
          <button onClick={handleShirtCatalogClick} className="font-bold text-lg text-black hover:text-gray-600">
            SHIRT CATALOG
          </button>
          <Link to="/shopPage" className="font-bold text-lg text-black hover:text-gray-600">
            SHOP
          </Link>
          <button onClick={handleShirtCatalogClick2} className="font-bold text-lg text-black hover:text-gray-600">
            ABOUT
          </button>
        </div>

        {/* Mobile Menu Icon and Shopping Bag Icon */}
        <div className="flex items-center space-x-4 absolute right-6">
          <Link to="/checkoutPage">
            <span className="material-symbols-outlined text-3xl font-extrabold cursor-pointer">
              shopping_bag
            </span>
          </Link>
          <span
            onClick={toggleMobileMenu}
            className="material-symbols-outlined text-3xl font-extrabold cursor-pointer"
          >
            more_vert
          </span>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 md:left-[83.5vw] w-full md:w-1/6  bg-white shadow-lg z-[100]">
          <div className="flex flex-col items-start p-4 space-y-4">
            <button onClick={handleShirtCatalogClick} className="text-black block md:hidden font-bold">
              SHIRT CATALOG
            </button>
            <Link to="/shopPage" className="text-black block md:hidden font-bold">
              SHOP
            </Link>
            <button onClick={handleShirtCatalogClick2} className="text-black block md:hidden font-bold">
              ABOUT
            </button>
            <button onClick={handleProfileClick} className="text-black font-bold">
              Profile
            </button>
            <Link to="/ordersPage" className="text-black font-bold">
              View Orders
            </Link>
            <button onClick={handleAuthAction} className="text-black font-bold">
              {isAuthenticated ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
