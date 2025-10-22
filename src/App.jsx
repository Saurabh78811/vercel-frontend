import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import {ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/useGetCurrentUser.js'
import Profile from './pages/Profile.jsx'
import { useSelector } from 'react-redux'
import ForgetPassword from './pages/ForgetPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import Courses from './pages/educator/Courses.jsx'
import CreateCourses from './pages/educator/CreateCourses.jsx'
import EditCourses from './pages/educator/EditCourse.jsx'
import getCreatorCourse from './customHooks/getCreatorCourse.js'
import getPublishedCourses from './customHooks/getPublishedCourses.js'
import AllCourses from './pages/AllCourses.jsx'

export const serverUrl= "https://vercel-backend-ruby-nine.vercel.app/"


const App = () => {
  getCurrentUser()
  getCreatorCourse()
  getPublishedCourses()
  const { userData} = useSelector(state=>state.user)
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to = {'/'}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={userData ? <Profile/> : <Navigate to={'/signup'}/>}/>
        <Route path='/forget' element={userData ? <ForgetPassword/> : <Navigate to={'/signup'}/>}/>
        <Route path='/editprofile' element={userData ? <EditProfile/> : <Navigate to={'/signup'}/>}/>
        <Route path='/allcourses' element={userData ? <AllCourses/> : <Navigate to={'/signup'}/>}/>
        <Route path='/dashboard' element={userData ?.role === "educator" ? <Dashboard/> : <Navigate to={'/signup'}/>}/>
        <Route path='/courses' element={userData ?.role === "educator"? <Courses/> : <Navigate to={'/signup'}/>}/>
        <Route path='/createcourses' element={userData ?.role === "educator"? <CreateCourses/> : <Navigate to={'/signup'}/>}/>
        <Route path='/editcourses/:courseId' element={userData ?.role === "educator"? <EditCourses/> : <Navigate to={'/signup'}/>}/>
</Routes>
      
    </div>
  )
}

export default App
