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
    <div className="flex flex-col gap-4 w-full">
      {/* Header Section */}
      <div className="flex gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-100 rounded-lg shadow-md relative">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
          alt="user avatar"
          className="w-12 h-12 rounded-full border-2 border-primaryBlue bg-white"
        />
        <div className="flex flex-col justify-center">
          <span className="text-sm text-gray-500">Hello,</span>
          <span className="font-semibold text-[16px] text-gray-800">
            {auth?.user?.name}
          </span>
        </div>
        <div
          className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-primaryBlue sm:hidden"
          onClick={toggleMenu}
        >
          <GiCrossMark size={20} />
        </div>
      </div>

      {/* Main Menu */}
      <div className="bg-white flex flex-col rounded-lg shadow-md overflow-hidden">
        {/* Account Settings */}
        <div className="border-b border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
            <PersonIcon className="text-primaryBlue" />
            <span className="font-semibold text-sm text-gray-600">
              ACCOUNT SETTINGS
            </span>
          </div>
          <div className="flex flex-col text-sm">
            <NavLink
              to="./profile"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              Profile Information
            </NavLink>
            <NavLink
              to="./address"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              Manage Addresses
            </NavLink>
            <NavLink
              to="./pan"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              Pan Card
            </NavLink>
          </div>
        </div>

        {/* Dashboard */}
        <div className="border-b border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
            <BarChartIcon className="text-primaryBlue" />
            <span className="font-semibold text-sm text-gray-600">
              DASHBOARD
            </span>
          </div>
          <div className="flex flex-col text-sm">
            <NavLink
              to="/user/orders"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/user/wishlist"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              My Wishlist
            </NavLink>
            <NavLink
              to="./payment-cards"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              Saved Cards
            </NavLink>
            <NavLink
              to="./user-review"
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-6 py-3 hover:bg-sky-50 transition ${
                  isActive ? "font-semibold text-primaryBlue bg-sky-50" : "text-gray-600"
                }`
              }
            >
              My Reviews
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="border-b border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-primaryBlue hover:bg-sky-50 transition w-full text-left"
          >
            <PowerSettingsNewIcon className="text-primaryBlue" />
            Logout
          </button>
        </div>
      </div>

      {/* Frequently Visited */}
      <div className="flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow">
        <span className="text-xs font-medium text-gray-500">
          Frequently Visited:
        </span>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <Link to="/forgot-password" className="hover:text-primaryBlue">
            Change Password
          </Link>
          <Link to="/user/orders" className="hover:text-primaryBlue">
            Track Order
          </Link>
          <Link to="/" className="hover:text-primaryBlue">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
