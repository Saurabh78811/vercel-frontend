import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboard2Data } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";






const ExploreCourses = () => {  // ✅ Fixed spelling: "Cources" → "Courses"
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[60vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[34px]">
      {/* Left / Top Section */}
      <div className="w-[100%] lg:w-[350px] h-[400px] lg:h-[100%] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[35px] font-semibold">Explore</span>
        <span className="text-[35px] font-semibold">Our Courses</span>

        <p className="text-[17px] text-center lg:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          possimus praesentium commodi placeat dolores dignissimos recusandae
          hic veniam soluta temporibus obcaecati dicta, cum aut dolorum culpa
          quo odio ipsa nihil!
        </p>

        <button className="px-[20px] py-[10px] border-2 border-white bg-black text-white rounded-[10px] text-[18px] font-light flex items-center gap-2 mt-[40px] hover:bg-gray-800 transition-all duration-200 cursor-pointer"
        onClick={() => navigate("/allcourses")}>
          Explore Courses
          <SiViaplay className="w-[25px] h-[25px]" /> 
        </button>
      </div>

      {/* Right / Bottom Section (Placeholder for now) */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center  lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Web Development

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <FaUikit className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            UI/UX Designer

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center">
            <MdAppShortcut className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            App Development

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <FaHackerrank className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Ethical Hacking

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <AiFillOpenAI className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            AI/ML

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center">
            <SiGoogledataproc className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Data Science

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <BsClipboard2Data className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Data Analytics

        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <SiOpenaigym className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            AI Tools

        </div>
        
        
        {/* Add course preview cards, images, or carousel here later */}
      </div>
    </div>
  );
};

export default ExploreCourses;
