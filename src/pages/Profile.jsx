import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigation = useNavigate();

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaArrowLeft
          className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigation("/")}
        />
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-black"
            />
          ) : (
            <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-500">{userData.role}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-sm flex items-center gap-1">
            <span className="font-bold text-gray-700">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <span className="font-bold text-gray-700">Bio:</span>
            <span>{userData.description || "No bio added yet."}</span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <span className="font-bold text-gray-700">Enrolled Courses:</span>
            <span>{userData.enrolledCourses?.length || 0}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-5 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
            onClick={() => navigation("/editprofile")}
          >
            Edit Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
