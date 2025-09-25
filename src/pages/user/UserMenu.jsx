import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GiCrossMark } from "react-icons/gi";

const UserMenu = ({ toggleMenu }) => {
    const { auth, setAuth, LogOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        LogOut();
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 p-3 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] rounded-xl shadow border border-[#bae6fd] relative">
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                    alt="user svg"
                    className="w-12 h-12 rounded-full border border-[#bae6fd] bg-white"
                />
                <div className="flex flex-col justify-center p-1">
                    <div className="text-[14px] text-[#64748b]">Hello,</div>
                    <div className="font-[600] text-[16px] text-[#2563eb]">
                        {auth?.user?.name}
                    </div>
                </div>
                <div
                    className="hover:scale-[1.06] absolute right-4 top-2 cursor-pointer sm:hidden text-[#2563eb]"
                    onClick={toggleMenu}
                >
                    <GiCrossMark />
                </div>
            </div>

            <div className="bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] flex flex-col justify-center rounded-xl shadow border border-[#bae6fd]">
                <div className="flex flex-col justify-center border-b border-[#bae6fd]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <PersonIcon className="text-[#2563eb] text-[16px]" />
                        <div className="font-[600] text-[14px] text-[#2563eb]">
                            ACCOUNT SETTINGS
                        </div>
                    </div>
                    <div className="flex flex-col font-[300] text-[14px] mb-2 mt-0 text-[#334155]">
                        <NavLink
                            to="./profile"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-[#2563eb] bg-[#f0f9ff]"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded">
                                Profile Information
                            </div>
                        </NavLink>
                        <NavLink
                            to="./address"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-[#2563eb] bg-[#f0f9ff]"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded">
                                Manage Addresses
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b border-[#bae6fd]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
                        <BarChartIcon className="text-[#2563eb] text-[16px]" />
                        <div className="font-[600] text-[14px] text-[#2563eb]">
                            DASHBOARD
                        </div>
                    </div>
                    <div className="flex flex-col font-[300] text-[14px] mb-2 mt-0 text-[#334155]">
                        <NavLink
                            to="/user/orders"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-[#2563eb] bg-[#f0f9ff]"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded">
                                My Orders
                            </div>
                        </NavLink>
                        <NavLink
                            to="/user/wishlist"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-[#2563eb] bg-[#f0f9ff]"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded">
                                My Wishlist
                            </div>
                        </NavLink>
                        <NavLink
                            to="./user-review"
                            onClick={scrollToTop}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-[600] text-[#2563eb] bg-[#f0f9ff]"
                                    : ""
                            }
                        >
                            <div className="h-[40px] px-[60px] flex items-center hover:text-[#2563eb] hover:bg-[#f0f9ff] rounded">
                                My Reviews
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col justify-center border-b border-[#bae6fd]">
                    <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px] group">
                        <PowerSettingsNewIcon className="text-[#2563eb] text-[16px]" />
                        <button
                            className="font-[600] text-[14px] w-full h-[40px] flex items-center text-[#2563eb] group-hover:text-[#0ea5e9]"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] rounded-xl shadow border border-[#bae6fd] mt-2">
                    <span className="text-xs font-medium text-[#2563eb]">
                        Frequently Visited:
                    </span>
                    <div className="flex gap-2.5 text-xs text-[#64748b]">
                        <Link to="/forgot-password">Change Password</Link>
                        <Link to="/user/orders">Track Order</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
