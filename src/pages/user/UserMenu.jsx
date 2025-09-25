import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GiCrossMark } from "react-icons/gi";

const UserMenu = ({ toggleMenu }) => {
  const { auth, LogOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    LogOut();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4 w-full animate-fadeIn">
      {/* User Header */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] rounded-xl shadow-md border border-[#bae6fd] relative">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
          alt="user avatar"
          className="w-12 h-12 rounded-full border-2 border-[#bae6fd] bg-white"
        />
        <div className="flex flex-col justify-center">
          <span className="text-sm text-gray-500">Hello,</span>
          <span className="font-semibold text-[#2563eb]">{auth?.user?.name}</span>
        </div>
        <div
          className="absolute right-4 top-3 cursor-pointer sm:hidden text-[#2563eb] hover:scale-110 transition-transform"
          onClick={toggleMenu}
        >
          <GiCrossMark size={20} />
        </div>
      </div>

      {/* Account & Dashboard Menu */}
      <div className="flex flex-col gap-2">
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-md border border-[#bae6fd] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#f0f9ff] border-b border-[#bae6fd]">
            <PersonIcon className="text-[#2563eb]" />
            <span className="font-semibold text-sm text-[#2563eb]">ACCOUNT SETTINGS</span>
          </div>
          <div className="flex flex-col text-sm text-gray-700">
            <NavLink
              to="./profile"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-[#e0f7fa] transition rounded ${
                  isActive ? "font-semibold text-[#2563eb] bg-[#e0f7fa]" : ""
                }`
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to="./address"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-[#e0f7fa] transition rounded ${
                  isActive ? "font-semibold text-[#2563eb] bg-[#e0f7fa]" : ""
                }`
              }
            >
              Manage Addresses
            </NavLink>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-white rounded-xl shadow-md border border-[#bae6fd] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#f0f9ff] border-b border-[#bae6fd]">
            <BarChartIcon className="text-[#2563eb]" />
            <span className="font-semibold text-sm text-[#2563eb]">DASHBOARD</span>
          </div>
          <div className="flex flex-col text-sm text-gray-700">
            <NavLink
              to="/user/orders"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-[#e0f7fa] transition rounded ${
                  isActive ? "font-semibold text-[#2563eb] bg-[#e0f7fa]" : ""
                }`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/user/wishlist"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-[#e0f7fa] transition rounded ${
                  isActive ? "font-semibold text-[#2563eb] bg-[#e0f7fa]" : ""
                }`
              }
            >
              My Wishlist
            </NavLink>
            <NavLink
              to="./user-review"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-[#e0f7fa] transition rounded ${
                  isActive ? "font-semibold text-[#2563eb] bg-[#e0f7fa]" : ""
                }`
              }
            >
              My Reviews
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-xl shadow-md border border-[#bae6fd] overflow-hidden">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-[#2563eb] hover:text-[#0ea5e9] hover:bg-[#e0f7fa] transition rounded w-full text-left"
          >
            <PowerSettingsNewIcon />
            Logout
          </button>
        </div>
      </div>

      {/* Frequently Visited */}
      <div className="bg-white rounded-xl shadow-md border border-[#bae6fd] p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-[#2563eb]">Frequently Visited:</span>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <Link to="/forgot-password" className="hover:text-[#2563eb] transition">
            Change Password
          </Link>
          <Link to="/user/orders" className="hover:text-[#2563eb] transition">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
