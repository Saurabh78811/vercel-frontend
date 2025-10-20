import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card.jsx";
import { motion } from "framer-motion";

const CardPage = () => {
  const { courseData = [] } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (Array.isArray(courseData)) {
      setPopularCourses(courseData?.slice(0, 6));
    }
  }, [courseData]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Title Section */}
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[40px] px-[20px]">
        Our Popular Courses
      </h1>

      <p className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[40px] px-[20px] text-gray-700">
        Explore top-rated courses designed to boost your skills, enhance your
        career, and unlock opportunities in Tech, AI, Business, and beyond.
      </p>

      {/* Card Section */}
      <div className="w-full flex flex-wrap justify-center gap-[40px] lg:p-[50px] md:p-[30px] p-[15px] py-[50px]">
        {popularCourses.length > 0 ? (
          popularCourses?.map((course, index) => (
            <motion.div
              key={course._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                thumbnail={course.thumbnail}
                title={course.title}
                category={course.category}
                price={course.price}
                id={course._id}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg mt-[50px]">
            No courses available yet. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPage;
