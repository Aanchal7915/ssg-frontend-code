/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsCart2, BsBox } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/cart";
// import { toast } from "react-toastify";
// import LogOut from "../../pages/Auth/LogOut";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const headerRef = useRef(null);

    const {auth, setAuth, LogOut} = useAuth();
    const [cartItems, setCartItems] = useCart();

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

    const handleLogout = () => {
        LogOut();
    };

    const handleStickyHeader = () => {
        if (
            document.body.scrollTop > 0 ||
            document.documentElement.scrollTop > 0
        ) {
            headerRef.current.classList.add("sticky__header");
        } else {
            headerRef.current.classList.remove("sticky__header");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyHeader);
        //clean up function
        return () => {
            window.removeEventListener("scroll", handleStickyHeader);
        };
    });
    return (
        <header ref={headerRef} className="bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] border-b border-[#38bdf8] shadow-md z-[50]">
            <nav className="container px-4 md:px-[50px]">
                <div className="flex items-center justify-between gap-3 md:gap-14 w-full flex-col md:flex-row sm:flex-row lg:flex-row">
                    {/* primary div */}
                    <div className="sm:h-[100px] md:h-[60px] lg:h-[60px] flex items-center justify-between w-[100%] max-w-[650px]">
                        <div className="flex gap-[20px] items-center w-[100%] flex-col md:flex-row sm:flex-row lg:flex-row">
                            {/* logo */}
                           <Link to="/" className="group relative">
                            <img
                                src="/logo-10.png"
                                alt="logo"
                                className="w-[50px] object-cover rounded-full border-[1px] border-[#54B1CE] shadow-lg bg-white transition-transform duration-200 hover:scale-105"
                                style={{
                                    boxShadow: "0 4px 24px 0 #54B1CE33",
                                }}
                            />
                        </Link>
                            {/* search bar */}
                            <SearchBar />
                        </div>
                    </div>

                    {/* secondary div */}
                    <div className="flex items-center justify-between gap-[50px] w-[70%] mb-4 md:mb-0">
                        {/* home */}
                        <div className="flex items-center group">
                            <NavLink to="/" className="flex items-center gap-1">
                                <BiHomeSmile className="text-[22px] text-[#2563eb]" />
                                <span className="text-[18px] hidden md:block lg:block group-hover:text-[#2563eb] text-[#334155]">
                                    Home
                                </span>
                            </NavLink>
                        </div>

                        {/* Account */}
                        <div
                            className={`flex items-center relative cursor-pointer group ${
                                auth.user
                                    ? "hover:bg-[#e0f7fa]"
                                    : "hover:bg-[#38bdf8]"
                            } rounded-md p-1`}
                            onMouseEnter={toggleDropdown}
                            onMouseLeave={closeDropdown}
                        >
                            {auth.user ? (
                                <div className="flex items-center gap-1 ">
                                    <AiOutlineUser className="text-[22px] text-[#2563eb]" />
                                    <span className="text-[18px] max-w-fit hidden md:block lg:block text-[#334155]">
                                        <p>{auth.user.name.split(" ")[0]}</p>
                                    </span>
                                    <span>
                                        <RiArrowDropDownLine className="group-hover:rotate-[180deg] transition-all text-[#2563eb]" />
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 w-fit">
                                    <Link
                                        to="/login"
                                        className="flex gap-1 group-hover:text-white"
                                    >
                                        <AiOutlineUser className="text-[22px] group-hover:text-white text-[#2563eb]" />
                                        <span className="text-[18px] max-w-fit hidden md:block lg:block text-[#334155]">
                                            <p>Sign in</p>
                                        </span>
                                    </Link>
                                    <span>
                                        <RiArrowDropDownLine
                                            className="group-hover:rotate-[180deg] transition-all 
                                                    group-hover:text-white text-[#2563eb]"
                                        />
                                    </span>
                                </div>
                            )}

                            {/* dropdown menu */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute top-[36px] -left-[2px] z-[50] bg-white border border-[#38bdf8] rounded-md p-2 w-[140px] transition-all flex flex-col shadow-xl"
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    <ul>
                                        {!auth.user && (
                                            <li className="p-1 hover:bg-[#e0f7fa] rounded-md">
                                                <Link
                                                    to="/register"
                                                    className="flex items-center gap-3 text-[#2563eb]"
                                                >
                                                    <MdLogin className="text-[14px] text-[#2563eb]" />
                                                    <span className="text-[16px] text-[#334155]">
                                                        Sign up
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-1 hover:bg-[#e0f7fa] rounded-md">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/dashboard`}
                                                className="flex items-center gap-3 text-[#2563eb]"
                                            >
                                                <AiOutlineUser className="text-[14px] text-[#2563eb]" />
                                                <span className="text-[16px] text-[#334155]">
                                                    My Profile
                                                </span>
                                            </Link>
                                        </li>
                                        {/* if user is not admin */}
                                        {auth.user?.role !== 1 && (
                                            <li className="p-1 hover:bg-[#e0f7fa] rounded-md">
                                                <Link
                                                    to="/user/wishlist"
                                                    className="flex items-center gap-3 text-[#2563eb]"
                                                >
                                                    <AiOutlineHeart className="text-[14px] text-[#2563eb]" />
                                                    <span className="text-[16px] text-[#334155]">
                                                        Wishlist
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-1 hover:bg-[#e0f7fa] rounded-md">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/orders`}
                                                className="flex items-center gap-3 text-[#2563eb]"
                                            >
                                                <BsBox className="text-[14px] text-[#2563eb]" />
                                                <span className="text-[16px] text-[#334155]">
                                                    Orders
                                                </span>
                                            </Link>
                                        </li>

                                        {auth.user && (
                                            <li className="p-1 hover:bg-[#e0f7fa] rounded-md ">
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="flex items-center gap-3 text-[#2563eb]"
                                                >
                                                    <MdLogout className="text-[14px] text-[#2563eb]" />
                                                    <span className="text-[16px] text-[#334155]">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* cart */}
                        {auth?.user?.role !== 1 && (
                            <div className="flex items-center gap-1 group">
                                <NavLink
                                    to="/cart"
                                    className="relative flex items-center gap-1"
                                >
                                    <span className="absolute w-4 h-4 text-[11px] text-center font-semibold left-2 bottom-3 text-white bg-[#f87171] rounded-[50%] ">
                                        {cartItems?.length}
                                    </span>
                                    <BsCart2 className="text-[22px] text-[#2563eb]" />
                                    <span className="hidden md:block lg:block group-hover:text-[#2563eb] text-[#334155]">
                                        <p className="text-[18px]">Cart</p>
                                    </span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;