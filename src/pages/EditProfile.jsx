import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlicer.js";
import { motion } from "framer-motion";

const EditProfile = () => {
  const navigation = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.photoUrl || "");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Profile Update
  const handleEditProfile = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (photoUrl) formData.append("photoUrl", photoUrl);

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });

      dispatch(setUserData(result.data));
      toast.success("Profile Updated Successfully");
      navigation("/profile");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Preview Selected Image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoUrl(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  // ✅ Loading State Fallback
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <FaArrowLeft
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer hover:text-gray-500 transition"
          onClick={() => navigation("/profile")}
        />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center text-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-black shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-[30px] border-2 border-white">
                {userData?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* Upload Avatar */}
          <div>
            <label htmlFor="image" className="text-sm font-medium text-gray-700">
              Select Avatar
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm cursor-pointer"
              onChange={handleFileChange}
            />
          </div>

          {/* User Name */}
          <div>
            <label htmlFor="name" className="text-sm font-bold text-gray-700">
              User Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input
              readOnly
              type="text"
              value={userData.email}
              className="w-full px-4 py-2 border rounded-md text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-bold text-gray-700">Bio</label>
            <textarea
              name="description"
              placeholder="Tell us about yourself"
              rows={3}
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            type="button"
            className="w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer flex justify-center"
            disabled={loading}
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={28} color="white" /> : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
