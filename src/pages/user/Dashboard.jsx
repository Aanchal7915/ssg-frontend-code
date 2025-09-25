import { Route, Routes, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Deactivate from "../Auth/Deactivate";
import Reviews from "./Reviews";
import PaymentCards from "./PaymentCards";
import SeoData from "../../SEO/SeoData";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const DeliveryAgentDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/user/dashboard")
            navigate("./profile");
    }, [navigate]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <>
            <SeoData title="User Dashboard" />
            <main className="w-full min-h-screen bg-[#f0f9ff] pt-2 pb-8 text-[#334155]">
                <div className="flex items-start justify-between text-[15px] px-2 sm:px-12 py-2 sm:py-10 gap-8 max-w-7xl mx-auto">
                    {/* Sidebar/Menu */}
                    <div
                        className={`sm:w-[28%] ${
                            isMenuOpen
                                ? "w-full h-full bg-gradient-to-br from-[#e0f7fa] via-[#f1faff] to-[#f0f9ff] border border-[#bae6fd] rounded-xl shadow-xl relative"
                                : "hidden"
                        } sm:inline-block`}
                    >
                        <UserMenu toggleMenu={toggleMenu} />
                    </div>
                    {/* Main Content */}
                    <div
                        className={`overflow-hidden w-full sm:w-[72%] bg-gradient-to-br from-[#e0f7fa]/80 via-[#f1faff]/80 to-[#f0f9ff]/80 shadow-md rounded-xl border border-[#bae6fd] ${
                            isMenuOpen ? "hidden" : "block"
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className="sm:hidden text-[#2563eb] underline rounded px-2 text-lg py-2"
                        >
                            {isMenuOpen ? "Close" : <GiHamburgerMenu />}
                        </button>
                        <Routes>
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="address" element={<AddressComponent />} />
                            <Route path="pan" element={<PanCardComponent />} />
                            <Route path="payment-cards" element={<PaymentCards />} />
                            <Route path="user-review" element={<Reviews />} />
                            <Route path="profile/deactivate" element={<Deactivate />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DeliveryAgentDashboard;
