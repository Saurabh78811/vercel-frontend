import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/educator/Dashboard.jsx";
import Courses from "./pages/educator/Courses.jsx";
import CreateCourses from "./pages/educator/CreateCourses.jsx";
import EditCourses from "./pages/educator/EditCourse.jsx";
import AllCourses from "./pages/AllCourses.jsx";

import useGetCurrentUser from "./customHooks/useGetCurrentUser.js";
import useGetCreatorCourse from "./customHooks/getCreatorCourse.js";
import useGetPublishedCourses from "./customHooks/getPublishedCourses.js";

export const serverUrl = "https://think-civil-8xes.vercel.app";

const App = () => {
  useGetCurrentUser();
  useGetCreatorCourse();
  useGetPublishedCourses();

  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forget"
          element={!userData ? <ForgetPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to="/signup" />}
        />
        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route
          path="/editcourses/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourses />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
