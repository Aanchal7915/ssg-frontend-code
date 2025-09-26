import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const { auth, LogOut } = useAuth();
  const [cartItems] = useCart();

  // const toggleDropdown = () => setDropdownOpen(true);
  // const closeDropdown = () => setDropdownOpen(false);
  let closeTimeout;
  const toggleDropdown = () => {
    clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };
  
  const handleLogout = () => LogOut();

  useEffect(() => {
    const handleSticky = () => {
      if (window.scrollY > 10) headerRef.current.classList.add("shadow-md");
      else headerRef.current.classList.remove("shadow-md");
    };
    window.addEventListener("scroll", handleSticky);
    return () => window.removeEventListener("scroll", handleSticky);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-shadow duration-300"
    >
      {/* Top bar */}
      <nav className="container mx-auto px-4 md:px-16 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo-10.png"
            alt="logo"
            className="w-12 h-12 rounded-full border-2 border-[#54B1CE] shadow-md hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <SearchBar />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Cart */}
          {auth?.user?.role !== 1 && (
            <NavLink
              to="/cart"
              className="relative text-[#54B1CE] hover:text-[#3a9cb8] transition-colors"
            >
              <BsCart2 className="text-2xl" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 text-[11px] text-white bg-red-500 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          )}

          {/* Account / Auth buttons */}
          {auth.user ? (
            <div
              className="relative hidden md:flex items-center gap-2 cursor-pointer"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              <AiOutlineUser className="text-[#54B1CE] text-2xl" />
              <span className="font-medium">{auth.user.name.split(" ")[0]}</span>
              <RiArrowDropDownLine className="text-[#54B1CE] text-2xl" />

              {isDropdownOpen && (
                <div className="absolute top-10 right-0 w-44 bg-white border border-[#54B1CE] rounded-lg shadow-lg p-3 flex flex-col gap-2">
                  <NavLink
                    to={`${auth.user.role === 1 ? "/admin" : "/user"
                      }/dashboard`}
                    className="px-3 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                  >
                    Profile
                  </NavLink>
                  {auth.user.role !== 1 && (
                    <NavLink
                      to="/user/wishlist"
                      className="px-3 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                    >
                      Wishlist
                    </NavLink>
                  )}
                  <NavLink
                    to={`${auth.user.role === 1 ? "/admin" : "/user"
                      }/orders`}
                    className="px-3 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 hover:bg-[#54B1CE]/10 rounded-md text-left w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-[#54B1CE] text-white rounded-full font-medium hover:bg-[#3a9cb8] transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-[#54B1CE] text-white rounded-full font-medium hover:bg-[#3a9cb8] transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-2xl text-[#54B1CE]"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="block md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-col gap-2 px-4 py-4">
            <NavLink
              to="/"
              className="px-4 py-2 bg-[#54B1CE] text-white rounded-full text-center font-medium hover:bg-[#3a9cb8] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            {!auth.user && (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 bg-[#54B1CE] text-white rounded-full text-center font-medium hover:bg-[#3a9cb8] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-[#54B1CE] text-white rounded-full text-center font-medium hover:bg-[#3a9cb8] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
            {auth.user && (
              <>
                <NavLink
                  to={`${auth.user.role === 1 ? "/admin" : "/user"
                    }/dashboard`}
                  className="px-4 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
                {auth.user.role !== 1 && (
                  <NavLink
                    to="/user/wishlist"
                    className="px-4 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </NavLink>
                )}
                <NavLink
                  to={`${auth.user.role === 1 ? "/admin" : "/user"
                    }/orders`}
                  className="px-4 py-2 hover:bg-[#54B1CE]/10 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#54B1CE]/10 rounded-md text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
