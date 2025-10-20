import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import Google from "../assets/google.jpg";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlicer";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebaseAuth";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

const handleLogin = async() =>{
  setLoading(true)
  try {
    const result = await axios.post(serverUrl + "/api/auth/login" , {email,password} ,{withCredentials:true})
    dispatch(setUserData(result.data))
    setLoading(false)
    toast.success("Login Successfull")
    navigate("/")
  } catch (error) {
    console.error(error);
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
      setLoading(false)
    
  }

}

 const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth , provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      let role = ""
      const result = await axios.post(serverUrl + "/api/auth/googleauth" , {name ,email,role} , {withCredentials:true})
       dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Sign Up Successfully ✅");
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex" onSubmit={(e) => e.preventDefault()}>
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back</h1>
            <h2 className="text-[#999797] items-center text-[18px]">
              Login your account
            </h2>
          </div>
          <div className="flex flex-col gap-2 w-[80%] items-start justify-center px-3">
            {/* Email */}
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
          <div className="flex flex-col gap-2 w-[80%] items-start justify-center px-3 relative">
            {/* Password */}
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

          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-md mt-4" onClick={handleLogin}>
            {loading ? <ClipLoader size={25} color="white" /> : "Login"}
          </button>
          <span className="text-[13px] cursor-pointer text-[#585757]" onClick={() => navigate("/forget")}>
            Forget password ?{" "}
          </span>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[35%] h-[0.5px] bg-[#c4c4c4]" />
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[35%] h-[0.5px] bg-[#c4c4c4]" />
          </div>
          <div className="w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center " onClick={googleSignUp}>
            <img src={Google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500 ">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            Create new Account{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="hidden md:block w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
          <img src={Logo} alt="" className="w-30 shadow-2xl" />
        </div>
      </form>
    </div>
  );
};

export default Login;
