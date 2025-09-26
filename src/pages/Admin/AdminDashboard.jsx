import { Route, Routes, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";
import EditProduct from "./EditProduct";
import SeoData from "../../SEO/SeoData";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Delivery from "./Delivery";
import { Fade } from "@mui/material";
import Category from "./Category";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin/dashboard") {
      navigate("./profile");
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <SeoData title="Admin Dashboard" />
      <main className="w-full min-h-screen bg-white text-[#05416c]">
        <div className="flex items-start justify-between text-[14px] h-full px-2 sm:px-[50px] py-2 sm:py-[40px] gap-5">
          {/* Sidebar/Menu */}
          <Fade in={isMenuOpen || window.innerWidth >= 640}>
            <div
              className={`sm:w-[30%] ${
                isMenuOpen
                  ? "relative w-full h-full bg-white z-50 border border-[#54B1CE] rounded-xl shadow-xl animate-fadeIn"
                  : "hidden"
              } sm:inline-block`}
            >
              <AdminMenu toggleMenu={toggleMenu} />
            </div>
          </Fade>

          {/* Main Content */}
          <div
            className={`w-full sm:w-[70%] bg-[#f0f8ff]/90 h-full shadow-md rounded-xl border border-[#54B1CE] transition-all duration-300 ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="sm:hidden text-[#54B1CE] underline rounded px-2 text-lg py-2"
            >
              {isMenuOpen ? "Close" : <GiHamburgerMenu />}
            </button>
            <Routes>
              <Route path="" element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              {/* <Route path="address" element={<AddressComponent />} /> */}
              {/* <Route path="pan" element={<PanCardComponent />} /> */}
              <Route path="add-product" element={<CreateProduct />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="category" element={<Category />} />
              {/* <Route path="profile/deactivate" element={<Deactivate />} /> */}
              <Route path="product/:productId" element={<EditProduct />} />
              {/* <Route path="delivery" element={<Delivery />} /> */}
            </Routes>
          </div>
        </div>
      </main>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
        `}
      </style>
    </>
  );
};

export default AdminDashboard;
