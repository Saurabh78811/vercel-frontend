import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigation = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Back Button */}
      <FaArrowLeft
        className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigation("/")}
      />

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Main Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image or Initial */}
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
              alt="Educator"
            />
          ) : (
            <div className="w-28 h-28 rounded-full flex items-center justify-center bg-black text-white text-3xl font-bold border-4 border-black shadow-md">
              {userData?.name?.slice(0, 1).toUpperCase() || "U"}
            </div>
          )}

          {/* User Info */}
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"}
            </h1>
            <h2 className="text-xl font-semibold text-gray-800">
              Total Earnings: ₹0
            </h2>
            <p className="text-gray-600">
              {userData?.description || "Start creating courses for your students!"}
            </p>

            <button
              onClick={() => navigation("/courses")}
              className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-all duration-200"
            >
              Create Course
            </button>
          </div>
        </div>

        {/* Graph Section (Future Implementation) */} 
      </div>
    </div>
  );
};

export default Dashboard;
