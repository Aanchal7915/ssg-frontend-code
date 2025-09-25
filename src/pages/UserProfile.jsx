import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState(false);
  const [emailSection, setEmailSection] = useState(false);
  const [phoneSection, setPhoneSection] = useState(false);
  const [email, setEmail] = useState(auth?.user?.email);
  const [name, setName] = useState(auth?.user?.name);
  const [phone, setPhone] = useState(auth?.user?.phone);
  const [nameInputFocused, setNameInputFocused] = useState(false);

  const handleProfile = () => setProfile(!profile);
  const handleEmail = () => setEmailSection(!emailSection);
  const handlePhone = () => setPhoneSection(!phoneSection);

  // update name
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    try {
      setProfile(false);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
        { newName: name, email: auth?.user?.email }
      );
      setAuth({
        ...auth,
        user: { ...auth.user, name },
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // update email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmailSection(false);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
        { newEmail: email, email: auth?.user?.email }
      );
      setAuth({
        ...auth,
        user: { ...auth.user, email },
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // update phone
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      setPhoneSection(false);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
        { newPhone: phone, email: auth?.user?.email }
      );
      setAuth({
        ...auth,
        user: { ...auth.user, phone },
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      toast.success(response.data.message);
    } catch (error) {
      error.response?.status === 401 &&
        toast.error("User not Found!");
      error.response?.status === 500 &&
        toast.error("Something went wrong! Please try later.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-start py-10 px-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-[#54B1CE]/20 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-[#54B1CE]">User Profile</h1>

        {/* Name */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Personal Information</span>
            <button
              className="text-sm text-[#54B1CE] hover:text-[#0e7490] font-medium transition"
              onClick={handleProfile}
            >
              {!profile ? "Edit" : "Cancel"}
            </button>
          </div>
          {profile ? (
            <form
              onSubmit={handleNameSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div
                className={`flex flex-col border rounded-lg px-3 py-2 w-full sm:w-2/3 ${
                  nameInputFocused ? "border-[#54B1CE] shadow-md" : "border-gray-300"
                }`}
              >
                <label htmlFor="name" className="text-xs text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameInputFocused(true)}
                  onBlur={() => setNameInputFocused(false)}
                  className="text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#54B1CE] text-white font-semibold rounded-lg px-6 py-2 shadow-md hover:bg-[#0e7490] transition"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-600 w-full sm:w-2/3 shadow-sm">
              {auth?.user?.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-gray-700">Email Address</span>
          {emailSection ? (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#54B1CE] focus:ring-2 focus:ring-[#54B1CE]/30 w-full sm:w-2/3"
              />
              <button
                type="submit"
                className="bg-[#54B1CE] text-white font-semibold rounded-lg px-6 py-2 shadow-md hover:bg-[#0e7490] transition"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-600 w-full sm:w-2/3 shadow-sm">
              {auth?.user?.email}
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Mobile Number</span>
            <button
              className="text-sm text-[#54B1CE] hover:text-[#0e7490] font-medium transition"
              onClick={handlePhone}
            >
              {!phoneSection ? "Edit" : "Cancel"}
            </button>
          </div>
          {phoneSection ? (
            <form
              onSubmit={handlePhoneSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#54B1CE] focus:ring-2 focus:ring-[#54B1CE]/30 w-full sm:w-2/3"
                inputMode="numeric"
                pattern="[0-9]*"
                minLength="10"
                maxLength="10"
              />
              <button
                type="submit"
                className="bg-[#54B1CE] text-white font-semibold rounded-lg px-6 py-2 shadow-md hover:bg-[#0e7490] transition"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-600 w-full sm:w-2/3 shadow-sm">
              {auth?.user?.phone}
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fade-in 0.8s ease-out both;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
