import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ai1 from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import Card from "../components/Card.jsx";
import { motion, AnimatePresence } from "framer-motion";

const AllCourses = () => {
  const navigation = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle selected category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filters
  const applyFilter = () => {
    let courseCopy = courseData ? [...courseData] : [];
    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourse(courseCopy);
  };

  useEffect(() => {
    if (courseData) setFilterCourse(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden">
      <NavBar />

      {/* Animated Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 left-0 h-screen w-[260px] bg-black p-6 py-[130px] border-r border-gray-200 shadow-md z-50 md:translate-x-0"
            >
              <h2 className="text-xl font-bold flex items-center justify-between gap-2 text-gray-50 mb-6">
                <span className="flex items-center gap-2">
                  <FaArrowLeft
                    className="text-white cursor-pointer"
                    onClick={() => navigation("/")}
                  />
                  Filter by Category
                </span>
                <button
                  className="md:hidden text-white text-lg"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✖
                </button>
              </h2>

              <form
                className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl"
                onSubmit={(e) => e.preventDefault()}
              >
                <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">
                  Search with AI
                  <img
                    src={ai1}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full"
                  />
                </button>

                {[
                  "App Development",
                  "AI/ML",
                  "Data Science",
                  "Ethical Hacking",
                  "Data Analytics",
                  "UI/UX Designing",
                  "Web Development",
                  "AI Tools",
                  "Other",
                ].map((cat, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
                  >
                    <input
                      type="checkbox"
                      className="accent-black w-4 h-4 rounded-md"
                      onChange={toggleCategory}
                      value={cat}
                    />
                    {cat}
                  </label>
                ))}
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-[260px] bg-black p-6 py-[130px] border-r border-gray-200 shadow-md z-10">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-50 mb-6">
          <FaArrowLeft
            className="text-white cursor-pointer"
            onClick={() => navigation("/")}
          />
          Filter by Category
        </h2>
        <form
          className="space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">
            Search with AI
            <img src={ai1} alt="" className="w-[30px] h-[30px] rounded-full" />
          </button>

          {[
            "App Development",
            "AI/ML",
            "Data Science",
            "Ethical Hacking",
            "Data Analytics",
            "UI/UX Designing",
            "Web Development",
            "AI Tools",
            "Other",
          ].map((cat, i) => (
            <label
              key={i}
              className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
            >
              <input
                type="checkbox"
                className="accent-black w-4 h-4 rounded-md"
                onChange={toggleCategory}
                value={cat}
              />
              {cat}
            </label>
          ))}
        </form>
      </div>

      {/* Main Content */}
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex flex-col items-center md:items-start justify-start px-[10px]">
        {/* Filter toggle button (mobile) */}
        <div className="w-full flex justify-between items-center mb-5 md:hidden">
          <h2 className="text-[20px] font-semibold">All Courses</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg"
          >
            <FaFilter /> Filter
          </button>
        </div>

        {/* Course grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 w-full">
          {filterCourse && filterCourse.length > 0 ? (
            filterCourse.map((course, index) => (
              <Card
                key={index}
                thumbnail={course.thumbnail}
                title={course.title}
                category={course.category}
                price={course.price}
                id={course._id}
              />
            ))
          ) : (
            <p className="text-gray-600 text-lg font-medium mt-10">
              No courses found for selected categories.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
