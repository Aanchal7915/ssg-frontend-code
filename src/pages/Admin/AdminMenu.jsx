import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GiCrossMark } from "react-icons/gi";

const AdminMenu = ({ toggleMenu }) => {
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
      {/* User Info */}
      <div className="flex relative items-start gap-4 p-3 bg-white rounded-xl shadow border border-[#54B1CE]">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
          alt="user svg"
          className="w-12 h-12 rounded-full border border-[#54B1CE] bg-white"
        />
        <div className="flex flex-col justify-center p-1">
          <div className="text-[14px] text-[#05416c]">Hello,</div>
          <div className="font-[600] text-[16px] text-[#54B1CE]">
            {auth?.user?.name}
          </div>
        </div>
        <div
          className="hover:scale-[1.06] absolute right-4 top-2 cursor-pointer sm:hidden text-[#54B1CE]"
          onClick={toggleMenu}
        >
          <GiCrossMark />
        </div>
      </div>

      {/* Menu Sections */}
      <div className="bg-white flex flex-col justify-center rounded-xl shadow border border-[#54B1CE] overflow-y-auto">
        {/* Account Settings */}
        <div className="flex flex-col justify-center border-b border-[#54B1CE]">
          <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
            <PersonIcon className="text-[#54B1CE] text-[16px]" />
            <div className="font-[600] text-[14px] text-[#05416c]">
              ACCOUNT SETTINGS
            </div>
          </div>
          <div className="flex flex-col text-[#05416c] font-[300] text-[14px] mb-2 mt-0">
            <NavLink
              to="./profile"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "font-[600] text-white bg-[#54B1CE]" : ""
              }
            >
              <div className="h-[40px] px-[60px] flex items-center hover:text-white hover:bg-[#54B1CE] rounded">
                Profile Information
              </div>
            </NavLink>
          </div>
        </div>

        {/* Dashboard */}
        <div className="flex flex-col justify-center border-b border-[#54B1CE]">
          <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px]">
            <BarChartIcon className="text-[#54B1CE] text-[16px]" />
            <div className="font-[600] text-[14px] text-[#05416c]">DASHBOARD</div>
          </div>
          <div className="flex flex-col text-[#05416c] font-[300] text-[14px] mb-2 mt-0">
            <NavLink
              to="/admin/orders"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "font-[600] text-white bg-[#54B1CE]" : ""
              }
            >
              <div className="h-[40px] px-[60px] flex items-center hover:text-white hover:bg-[#54B1CE] rounded">
                Orders
              </div>
            </NavLink>
            <NavLink
              to="./all-products"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "font-[600] text-white bg-[#54B1CE]" : ""
              }
            >
              <div className="h-[40px] px-[60px] flex items-center hover:text-white hover:bg-[#54B1CE] rounded">
                Products
              </div>
            </NavLink>
            <NavLink
              to="./add-product"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "font-[600] text-white bg-[#54B1CE]" : ""
              }
            >
              <div className="h-[40px] px-[60px] flex items-center hover:text-white hover:bg-[#54B1CE] rounded">
                Add Product
              </div>
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="flex flex-col justify-center border-b border-[#54B1CE]">
          <div className="flex flex-row items-center gap-6 pl-[10px] py-[8px] group">
            <PowerSettingsNewIcon className="text-[#54B1CE] text-[16px]" />
            <button
              className="font-[600] text-[14px] w-full h-[40px] flex items-center text-[#05416c] group-hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Frequently Visited */}
        <div className="flex flex-col items-start gap-2 p-4 bg-white rounded-xl shadow border border-[#54B1CE] mt-2">
          <span className="text-xs font-medium text-[#05416c]">Frequently Visited:</span>
          <div className="flex gap-2.5 text-xs text-[#54B1CE]">
            <Link to="/forgot-password">Change Password</Link>
            <Link to="/admin/orders">Track Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
