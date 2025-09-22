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

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const headerRef = useRef(null);

    const { auth, LogOut } = useAuth();
    const [cartItems] = useCart();

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
        return () => {
            window.removeEventListener("scroll", handleStickyHeader);
        };
    });

    return (
        <header
            ref={headerRef}
            className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 border-b border-gray-600 shadow-2xl transition-all duration-300"
        >
            <nav className="container px-4 md:px-[50px]">
                <div className="py-2 flex items-center justify-between gap-3 md:gap-14 w-full flex-col md:flex-row">
                    {/* primary div */}
                    <div className="flex items-center w-full max-w-[650px] gap-4">
                        {/* logo */}
                        <Link to="/" className="group relative">
                            
                                <img
                                    src="/logo-10.png"
                                    alt="logo"
                                    className="w-[60px] h-[60px] object-cover rounded-full border-[1px] border-gray-600"
                                />
                            
                        </Link>
                        {/* search bar */}
                        <div className="flex-1">
                            <SearchBar />
                        </div>
                    </div>

                    {/* secondary div */}
                    <div className="flex items-center justify-between gap-8 w-full md:w-auto mt-4 md:mt-0">
                        {/* home */}
                        <NavLink
                            to="/"
                            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-800/70 transition group"
                        >
                            <BiHomeSmile className="text-[22px] text-indigo-400 group-hover:text-indigo-300" />
                            <span className="text-[16px] hidden md:block text-gray-200 group-hover:text-indigo-300">
                                Home
                            </span>
                        </NavLink>

                        {/* Account */}
                        <div
                            className={`flex items-center relative cursor-pointer group rounded-lg px-3 py-2 hover:bg-gray-800/70 transition`}
                            onMouseEnter={toggleDropdown}
                            onMouseLeave={closeDropdown}
                        >
                            {auth.user ? (
                                <div className="flex items-center gap-1">
                                    <AiOutlineUser className="text-[22px] text-indigo-400" />
                                    <span className="text-[16px] max-w-fit hidden md:block text-gray-200">
                                        {auth.user.name.split(" ")[0]}
                                    </span>
                                    <RiArrowDropDownLine className="text-indigo-400 group-hover:rotate-180 transition-transform" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <Link
                                        to="/login"
                                        className="flex gap-1 text-gray-200 group-hover:text-indigo-300"
                                    >
                                        <AiOutlineUser className="text-[22px] text-indigo-400 group-hover:text-indigo-300" />
                                        <span className="text-[16px] max-w-fit hidden md:block">
                                            Sign in
                                        </span>
                                    </Link>
                                    <RiArrowDropDownLine className="text-indigo-400 group-hover:rotate-180 transition-transform" />
                                </div>
                            )}

                            {/* dropdown menu */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute top-[46px] -left-2 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border border-gray-700 rounded-xl p-2 w-[170px] shadow-xl transition-all flex flex-col"
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    <ul>
                                        {!auth.user && (
                                            <li className="p-2 hover:bg-gray-800 rounded-lg transition">
                                                <Link
                                                    to="/register"
                                                    className="flex items-center gap-3 text-gray-200"
                                                >
                                                    <MdLogin className="text-[18px] text-indigo-400" />
                                                    <span className="text-[15px]">
                                                        Sign up
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-2 hover:bg-gray-800 rounded-lg transition">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : auth?.user?.role === 0
                                                        ? "/user"
                                                        : "/delivery-agent"
                                                }/dashboard`}
                                                className="flex items-center gap-3 text-gray-200"
                                            >
                                                <AiOutlineUser className="text-[18px] text-indigo-400" />
                                                <span className="text-[15px]">
                                                    My Profile
                                                </span>
                                            </Link>
                                        </li>
                                        {/* if user is not admin */}
                                        {auth.user?.role !== 1 && (
                                            <li className="p-2 hover:bg-gray-800 rounded-lg transition">
                                                <Link
                                                    to="/user/wishlist"
                                                    className="flex items-center gap-3 text-gray-200"
                                                >
                                                    <AiOutlineHeart className="text-[18px] text-pink-400" />
                                                    <span className="text-[15px]">
                                                        Wishlist
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-2 hover:bg-gray-800 rounded-lg transition">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/orders`}
                                                className="flex items-center gap-3 text-gray-200"
                                            >
                                                <BsBox className="text-[18px] text-yellow-400" />
                                                <span className="text-[15px]">
                                                    Orders
                                                </span>
                                            </Link>
                                        </li>
                                        {auth.user && (
                                            <li className="p-2 hover:bg-gray-800 rounded-lg transition">
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="flex items-center gap-3 text-gray-200"
                                                >
                                                    <MdLogout className="text-[18px] text-red-400" />
                                                    <span className="text-[15px]">
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
                            <NavLink
                                to="/cart"
                                className="relative flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-800/70 transition group"
                            >
                                <span className="absolute w-5 h-5 text-[11px] text-center font-semibold left-4 -top-2 text-white bg-red-500 rounded-full flex items-center justify-center shadow">
                                    {cartItems?.length}
                                </span>
                                <BsCart2 className="text-[22px] text-indigo-400 group-hover:text-indigo-300" />
                                <span className="hidden md:block text-gray-200 group-hover:text-indigo-300">
                                    <p className="text-[16px]">Cart</p>
                                </span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
