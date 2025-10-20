import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import Google from "../assets/google.jpg";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlicer";
import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "../../utils/firebaseAuth.js";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Sign Up Successfully ✅");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth , provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googleauth" , {name ,email,role} , {withCredentials:true})
       dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Sign Up Successfully ✅");
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form
        className="w-[90%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left Section */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2 w-[80%] px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 w-[80%] px-3">
            <label htmlFor="email" className="font-semibold">
              Email Id
            </label>
            <input
              id="email"
              type="email"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded"
              placeholder="Enter Email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 w-[80%] px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <LuEyeClosed
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <LuEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* Role selection */}
          <div className="flex md:w-[50%] w-[70%] items-center justify-between mt-2">
            <span
              className={`px-[10px] py-[5px] border rounded-xl cursor-pointer ${
                role === "student" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[5px] border rounded-xl cursor-pointer ${
                role === "educator" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>

          {/* Submit button */}
          <button
            className="w-[80%] h-[40px] bg-black text-white flex items-center justify-center rounded-md mt-4"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Sign Up"}
          </button>

          {/* Google signup */}
          <div className="w-[80%] flex items-center gap-2 mt-3">
            <div className="flex-grow h-[0.5px] bg-[#c4c4c4]" />
            <div className="text-[15px] text-[#6f6f6f]">Or continue</div>
            <div className="flex-grow h-[0.5px] bg-[#c4c4c4]" />
          </div>

          <div
            className="w-[80%] h-[40px] border rounded-[5px] flex items-center justify-center cursor-pointer hover:bg-gray-100 "
            onClick={googleSignUp}
          >
            <img src={Google} alt="google" className="w-[25px]" />
            <span className="text-[18px] text-gray-500 ml-2 cursor-pointer">
              Sign up with Google
            </span>
          </div>

          {/* Login redirect */}
          <div className="text-[#6f6f6f] mt-2">
            Already have an account?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-[50%] h-full bg-black rounded-r-2xl items-center justify-center">
          <img src={Logo} alt="logo" className="w-40 shadow-2xl" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
