import React from "react";
import NavBar from "../components/NavBar";
import HomeImage from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCources from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full lg:h-[100vh] h-[80vh]">
        {/* Navbar */}
        <NavBar />

        {/* Background Image */}
        <img
          src={HomeImage}
          alt="Home background"
          className="object-cover w-[100%] lg:h-[100%] h-[70vh]"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

        {/* Headings */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.span
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="lg:text-[70px] md:text-[40px] text-[22px] font-bold"
          >
            Grow Your Skill to Advance
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:text-[70px] md:text-[40px] text-[22px] font-bold mt-2"
          >
            Your Career Path
          </motion.span>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap mt-10"
          >
            <button className="px-6 py-3 border-2 border-white text-white rounded-xl text-[18px] font-medium flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black transition-all"
            onClick={() => navigate("/allcourses")}>
              View All Courses
              <SiViaplay className="w-[25px] h-[25px]" />
            </button>

            <button className="px-6 py-3 bg-white text-black rounded-xl text-[18px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all">
              Search with AI
              <img
                src={ai}
                className="w-[30px] h-[30px] rounded-full hidden lg:block"
                alt="AI"
              />
              <img
                src={ai1}
                className="w-[30px] h-[30px] rounded-full lg:hidden"
                alt="AI icon"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Body Sections */}
      <div className="mt-[70px] mx-3 mb-3">
        <Logos />
        <ExploreCources />
        <CardPage />
      </div>
    </div>
  );
};

export default Home;
