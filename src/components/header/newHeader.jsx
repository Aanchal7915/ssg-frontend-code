/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
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
    }, []);

    return (
        <header
            ref={headerRef}
            className="bg-gradient-to-br from-[#e0f7fa] via-[#e6e9f2] to-[#b6e0f7] border-b border-[#54B1CE] shadow-2xl transition-all duration-300"
        >
            <nav className="container px-4 md:px-12">
                <div className="py-4 flex items-center justify-between gap-3 md:gap-14 w-full flex-col md:flex-row">
                    {/* Logo & Search */}
                    <div className="flex items-center w-full max-w-[700px] gap-5">
                        <Link to="/" className="group relative">
                            <img
                                src="/logo-10.png"
                                alt="logo"
                                className="w-[64px] h-[64px] object-cover rounded-full border-[1px] border-[#54B1CE] shadow-lg bg-white transition-transform duration-200 hover:scale-105"
                                style={{
                                    boxShadow: "0 4px 24px 0 #54B1CE33",
                                }}
                            />
                        </Link>
                        <div className="flex-1">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Navigation & User */}
                    <div className="flex items-center justify-between gap-10 w-full md:w-auto mt-4 md:mt-0">
                        {/* Home */}
                        <NavLink
                            to="/"
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 hover:bg-[#54B1CE]/20 border border-[#54B1CE] shadow transition group font-bold"
                            style={{
                                backdropFilter: "blur(2px)",
                            }}
                        >
                            <BiHomeSmile className="text-[24px] text-[#54B1CE] group-hover:text-[#0ea5e9] drop-shadow" />
                            <span className="text-[17px] hidden md:block text-gray-700 group-hover:text-[#0ea5e9] font-bold tracking-wide">
                                Home
                            </span>
                        </NavLink>

                        {/* Account Dropdown */}
                        <div
                            className={`flex items-center relative cursor-pointer group rounded-full px-5 py-2 bg-white/70 hover:bg-[#54B1CE]/20 border border-[#54B1CE] shadow transition font-bold`}
                            style={{
                                backdropFilter: "blur(2px)",
                            }}
                            onMouseEnter={toggleDropdown}
                            onMouseLeave={closeDropdown}
                        >
                            {auth.user ? (
                                <div className="flex items-center gap-2">
                                    <AiOutlineUser className="text-[24px] text-[#54B1CE]" />
                                    <span className="text-[17px] max-w-fit hidden md:block text-gray-700 font-bold tracking-wide">
                                        {auth.user.name.split(" ")[0]}
                                    </span>
                                    <RiArrowDropDownLine className="text-[#54B1CE] group-hover:rotate-180 transition-transform text-[28px]" />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/login"
                                        className="flex gap-2 text-gray-700 group-hover:text-[#0ea5e9] font-bold"
                                    >
                                        <AiOutlineUser className="text-[24px] text-[#54B1CE] group-hover:text-[#0ea5e9]" />
                                        <span className="text-[17px] max-w-fit hidden md:block">
                                            Sign in
                                        </span>
                                    </Link>
                                    <RiArrowDropDownLine className="text-[#54B1CE] group-hover:rotate-180 transition-transform text-[28px]" />
                                </div>
                            )}

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute top-[36px] -left-[2px] z-50 bg-white border border-gray-300 rounded-md p-2 w-[140px] transition-all flex flex-col"
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={closeDropdown}

                                >
                                    <ul>
                                        {!auth.user && (
                                            <li className="p-2 hover:bg-[#e0f7fa] rounded-lg transition font-semibold">
                                                <Link
                                                    to="/register"
                                                    className="flex items-center gap-3 text-gray-700"
                                                >
                                                    <MdLogin className="text-[20px] text-[#54B1CE]" />
                                                    <span className="text-[16px] font-semibold">
                                                        Sign up
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-2 hover:bg-[#e0f7fa] rounded-lg transition font-semibold">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : auth?.user?.role === 0
                                                        ? "/user"
                                                        : "/delivery-agent"
                                                }/dashboard`}
                                                className="flex items-center gap-3 text-gray-700"
                                            >
                                                <AiOutlineUser className="text-[20px] text-[#54B1CE]" />
                                                <span className="text-[16px] font-semibold">
                                                    My Profile
                                                </span>
                                            </Link>
                                        </li>
                                        {/* if user is not admin */}
                                        {auth.user?.role !== 1 && (
                                            <li className="p-2 hover:bg-[#e0f7fa] rounded-lg transition font-semibold">
                                                <Link
                                                    to="/user/wishlist"
                                                    className="flex items-center gap-3 text-gray-700"
                                                >
                                                    <AiOutlineHeart className="text-[20px] text-pink-400" />
                                                    <span className="text-[16px] font-semibold">
                                                        Wishlist
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="p-2 hover:bg-[#e0f7fa] rounded-lg transition font-semibold">
                                            <Link
                                                to={`${
                                                    auth?.user?.role === 1
                                                        ? "/admin"
                                                        : "/user"
                                                }/orders`}
                                                className="flex items-center gap-3 text-gray-700"
                                            >
                                                <BsBox className="text-[20px] text-yellow-400" />
                                                <span className="text-[16px] font-semibold">
                                                    Orders
                                                </span>
                                            </Link>
                                        </li>
                                        {auth.user && (
                                            <li className="p-2 hover:bg-[#e0f7fa] rounded-lg transition font-semibold">
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="flex items-center gap-3 text-gray-700"
                                                >
                                                    <MdLogout className="text-[20px] text-red-400" />
                                                    <span className="text-[16px] font-semibold">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        {auth?.user?.role !== 1 && (
                            <NavLink
                                to="/cart"
                                className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 hover:bg-[#54B1CE]/20 border border-[#54B1CE] shadow transition group font-bold"
                                style={{
                                    backdropFilter: "blur(2px)",
                                }}
                            >
                                <span className="absolute w-6 h-6 text-[12px] text-center font-bold left-5 -top-2 text-white bg-[#54B1CE] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    {cartItems?.length}
                                </span>
                                <BsCart2 className="text-[24px] text-[#54B1CE] group-hover:text-[#0ea5e9]" />
                                <span className="hidden md:block text-gray-700 group-hover:text-[#0ea5e9] font-bold">
                                    <p className="text-[17px]">Cart</p>
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
