import React, { useState } from "react";
import Logo from "../assets/logoAthinnk.PNG";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlicer";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

const NavBar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHame, setHame] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-full h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-[9999] backdrop-blur-md">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="Logo"
          className="h-12 md:h-16 w-auto object-contain border-2 border-white rounded-2xl"
        />
      </div>

      {/* Desktop Right Section */}
      <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
        {/* Profile Section */}
        {userData ? (
          userData.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="User Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )
        ) : (
          <IoPersonCircleSharp
            className="w-[50px] h-[50px] fill-white cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          />
        )}

        {/* Educator Dashboard */}
        {userData?.role === "educator" && (
          <div
            className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer hover:bg-white hover:text-black transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}

        {/* Login / Logout */}
        {userData ? (
          <span
            className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer hover:bg-white hover:text-black transition"
            onClick={handleLogout}
          >
            Logout
          </span>
        ) : (
          <span
            className="px-[20px] py-[10px] border-2 border-black text-black bg-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer hover:bg-black hover:text-white transition"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}

        {/* Profile Dropdown */}
        {show && (
           
          <div className="absolute top-[110%] right-[15%] flex flex-col items-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black shadow-lg">
            <span
              className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-700"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>
            <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-700">
              My Courses
            </span>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <RxHamburgerMenu
        className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer"
        onClick={() => setHame((prev) => !prev)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#000000d6] flex flex-col items-center justify-center gap-5 z-[9999] transform ${
          showHame
            ? "translate-x-0 transition-transform duration-[600ms] ease-in-out"
            : "translate-x-full transition-transform duration-[600ms] ease-in-out"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%] cursor-pointer"
          onClick={() => setHame(false)}
        />

        {userData ? (
          <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white">
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        ) : (
          <IoPersonCircleSharp className="w-[50px] h-[50px] fill-white cursor-pointer" />
        )}

        <div
          className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer hover:bg-white hover:text-black transition"
          onClick={() => navigate("/profile")}
        >
          My Profile
        </div>

        <div className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer hover:bg-white hover:text-black transition">
          My Courses
        </div>

        {userData?.role === "educator" && (
          <div
            className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer hover:bg-white hover:text-black transition"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}

        {userData ? (
          <span
            className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer hover:bg-white hover:text-black transition"
            onClick={handleLogout}
          >
            Logout
          </span>
        ) : (
          <span
            className="w-[200px] h-[65px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer hover:bg-white hover:text-black transition"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
