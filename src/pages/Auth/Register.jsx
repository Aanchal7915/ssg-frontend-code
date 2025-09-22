import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import SeoData from "../../SEO/SeoData";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    //form submission handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (password !== confirmPassword) {
                toast.error("Password does not match!");
                setIsSubmitting(false);
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
                {
                    name,
                    email,
                    phone,
                    password,
                    address,
                    isSeller,
                }
            );

            // Registration successful
            response.status === 201 &&
                toast.success(
                    "User Registered Successfully! Please Login..."
                ) &&
                navigate("/login");

            // Email already registered
            response.status === 200 &&
                toast.error("Email is already registered! Please Login...") &&
                navigate("/login");
        } catch (error) {
            console.error("Error:", error);

            //server error
            error.response?.status === 500 &&
                toast.error(
                    "Something went wrong! Please try after sometime."
                ) &&
                navigate("/register");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SeoData
                title="Sign up - New User"
                description="Register new user with details"
            />
            {isSubmitting ? (
                <Spinner />
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-4 px-2">
                    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-0 flex flex-col md:flex-row gap-0 md:gap-0 overflow-hidden">
                        {/* Left Side (Info/Brand) */}
                        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
                            <img
                                src="/logo-10.png"
                                className="w-24 h-24 object-cover rounded-full border-[1px] border-indigo-500 shadow mb-4"
                                alt="logo"
                            />
                            <h2 className="text-3xl font-bold text-indigo-300 mb-2">
                                Looks like you&apos;re new here!
                            </h2>
                            <p className="text-base text-gray-400 text-center mb-6">
                                Sign up with the required details to get started
                            </p>
                            <img
                                src="/register-11.gif"
                                alt="auth"
                                className="w-56 h-56 object-contain"
                            />
                        </div>
                        {/* Right Side (Form) */}
                        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
                            {/* Logo for mobile */}
                            <div className="flex flex-col items-center gap-2 md:hidden mb-4">
                                <img
                                    src="/logo-10.png"
                                    className="w-20 h-20 object-cover rounded-full border-[1px] border-indigo-500 shadow"
                                    alt="logo"
                                />
                                <h2 className="text-2xl font-bold text-indigo-300 mt-2">
                                    Looks like you&apos;re new here!
                                </h2>
                                <p className="text-sm text-gray-400 text-center">
                                    Sign up with the required details to get started
                                </p>
                            </div>
                            {/* Auth image for mobile */}
                            <div className="flex justify-center md:hidden mb-4">
                                <img
                                    src="/register-11.gif"
                                    alt="auth"
                                    className="w-32 h-32 object-contain"
                                />
                            </div>
                            {/* Register Form */}
                            <form
                                action="/register"
                                method="post"
                                className="flex flex-col gap-5"
                                onSubmit={handleFormSubmit}
                            >
                                <div className="relative">
                                    <input
                                        autoComplete="on"
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="on"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Email address"
                                        required
                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="on"
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Mobile Number"
                                        required
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        minLength="10"
                                        maxLength="10"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-4 pr-10 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Password"
                                        required
                                        minLength="5"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                                        onClick={handlePasswordToggle}
                                    >
                                        {!showPassword ? (
                                            <AiFillEye size={18} />
                                        ) : (
                                            <AiFillEyeInvisible size={18} />
                                        )}
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="confirm_password"
                                        name="confirm_password"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-4 pr-10 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                                        onClick={handlePasswordToggle}
                                    >
                                        {!showPassword ? (
                                            <AiFillEye size={18} />
                                        ) : (
                                            <AiFillEyeInvisible size={18} />
                                        )}
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="on"
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="pl-4 pr-3 py-2 w-full rounded-lg bg-gray-900 border border-gray-700 text-indigo-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-base"
                                        placeholder="Address"
                                        required
                                    />
                                </div>
                                {/* Seller checkbox (optional, uncomment if needed)
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isSeller}
                                        onChange={() => setIsSeller(!isSeller)}
                                        className="accent-indigo-500"
                                    />
                                    <span className="text-xs text-indigo-200">Register as Seller</span>
                                </div>
                                */}
                                <button
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                                    type="submit"
                                >
                                    Continue
                                </button>
                            </form>
                            <div className="flex flex-col gap-2 mt-4">
                                <Link
                                    to="/login"
                                    className="text-indigo-400 hover:text-indigo-300 text-xs text-center font-medium transition"
                                >
                                    Existing User? Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;
