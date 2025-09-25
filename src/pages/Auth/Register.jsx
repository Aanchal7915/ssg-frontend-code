//TODO: maintain otp time status in local storage

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import SeoData from "../../SEO/SeoData";

const OTP_TIMER = 100; // in seconds

const Register = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    if (otpSent && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, otpSent]);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setOtpLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/send-otp`, { email });
      toast.success("OTP sent to your email!");
      setOtpSent(true);
      setTimer(OTP_TIMER);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setOtpLoading(true);
    try {
      setOtpSent(true);
      setTimer(OTP_TIMER);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Register
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
        { name, email, phone, password, isSeller, otp }
      );
      response.status === 201 &&
        toast.success("User Registered Successfully! Please Login...") &&
        navigate("/login");
      response.status === 200 &&
        toast.error("Email is already registered! Please Login...") &&
        navigate("/login");
    } catch (error) {
      error.response?.status === 500 &&
        toast.error("Something went wrong! Please try again later.") &&
        navigate("/register");
      error.response?.status === 400 &&
        toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimer = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <SeoData
        title="Sign up - New User"
        description="Register new user with details"
      />
      {(isSubmitting || otpLoading) ? (
        <Spinner />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-[#54B1CE]/30 bg-white flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Side */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#54B1CE]/10 p-8">
              <img
                src="/logo-10.png"
                className="w-24 h-24 object-cover rounded-full border border-[#54B1CE] shadow-lg mb-4"
                alt="logo"
              />
              <h2 className="text-3xl font-bold text-[#54B1CE] mb-2">
                Looks like you&apos;re new here!
              </h2>
              <p className="text-base text-gray-600 text-center mb-6">
                Sign up with the required details to get started
              </p>
              <img
                src="/register-11.gif"
                alt="auth"
                className="w-56 h-56 object-contain"
              />
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
              
              {/* Mobile Header */}
              <div className="flex flex-col items-center gap-2 md:hidden mb-6">
                <img
                  src="/logo-10.png"
                  className="w-20 h-20 object-cover rounded-full border border-[#54B1CE] shadow"
                  alt="logo"
                />
                <h2 className="text-2xl font-bold text-[#54B1CE] mt-2">
                  Looks like you&apos;re new here!
                </h2>
                <p className="text-sm text-gray-600 text-center">
                  Sign up with the required details to get started
                </p>
              </div>
              <div className="flex justify-center md:hidden mb-4">
                <img
                  src="/register-11.gif"
                  alt="auth"
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Register Form */}
              {step === 1 ? (
                <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-4 pr-3 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE] transition"
                    placeholder="Email address"
                    required
                  />
                  <button
                    type="submit"
                    disabled={otpSent && timer > 0}
                    className="w-full bg-[#54B1CE] hover:bg-[#429ab5] text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                  >
                    {otpSent && timer > 0
                      ? `Resend OTP in ${formatTimer(timer)}`
                      : "Send OTP"}
                  </button>
                  {otpSent && (
                    <div className="text-center text-xs text-gray-500">
                      {timer > 0 ? (
                        `Resend OTP in ${formatTimer(timer)}`
                      ) : (
                        <button
                          type="button"
                          className="text-[#54B1CE] hover:text-[#0e7490] font-medium transition text-xs"
                          onClick={handleResendOtp}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  )}
                  <Link
                    to="/login"
                    className="text-[#54B1CE] hover:text-[#0e7490] text-xs text-center font-medium transition mt-4"
                  >
                    Existing User? Log in
                  </Link>
                </form>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#54B1CE] hover:text-[#0e7490] text-xs flex items-center gap-2 w-fit"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    Back
                  </button>
                  
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-4 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE]"
                  />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="pl-4 py-2 w-full rounded-lg bg-gray-100 border border-[#54B1CE]/50 text-gray-400 cursor-not-allowed"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    maxLength="10"
                    className="pl-4 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE]"
                  />
                  
                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="5"
                      className="pl-4 pr-10 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE]"
                    />
                    <span
                      onClick={handlePasswordToggle}
                      className="absolute right-3 top-2.5 text-[#54B1CE] cursor-pointer"
                    >
                      {!showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-4 pr-10 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE]"
                    />
                    <span
                      onClick={handlePasswordToggle}
                      className="absolute right-3 top-2.5 text-[#54B1CE] cursor-pointer"
                    >
                      {!showPassword ? <AiFillEye size={18} /> : <AiFillEyeInvisible size={18} />}
                    </span>
                  </div>

                  {/* OTP */}
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength="6"
                    className="pl-4 py-2 w-full rounded-lg bg-white border border-[#54B1CE]/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54B1CE]"
                  />
                  <div className="text-center text-xs text-gray-500">
                    {timer > 0 ? (
                      `Resend OTP in ${formatTimer(timer)}`
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-[#54B1CE] hover:text-[#0e7490] font-medium transition text-xs"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#54B1CE] hover:bg-[#429ab5] text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all uppercase tracking-wide text-base"
                  >
                    Register
                  </button>
                  
                  <Link
                    to="/login"
                    className="text-[#54B1CE] hover:text-[#0e7490] text-xs text-center font-medium transition"
                  >
                    Existing User? Log in
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
