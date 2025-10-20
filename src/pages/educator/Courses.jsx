import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/imgNot.jpg";
import { setCreatorCourseData } from "../../redux/courseSlicer.js";
import { serverUrl } from "../../App";
import axios from "axios";

const Courses = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreator",
          { withCredentials: true }
        );
        console.log(result.data);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.error("Error fetching creator courses:", error);
      }
    };

    // Only fetch when user is logged in
    if (userData?._id) creatorCourses();
  }, [userData?._id, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full min-h-screen p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex items-center justify-center gap-3">
            <FaArrowLeft
              className="w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigation("/")}
            />
            <h1 className="text-2xl font-semibold">All Created Courses</h1>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => navigation("/createcourses")}
          >
            Create Course
          </button>
        </div>

        {/* Table for Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.length > 0 ? (
                creatorCourseData.map((course, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-4 flex items-center gap-4">
                      <img
                        src={course?.thumbnail || img}
                        alt={course?.title}
                        className="w-25 h-14 object-cover rounded-md border border-gray-300"
                      />
                      <span>{course?.title || "Untitled Course"}</span>
                    </td>
                    <td className="px-4 py-3">
                      {course?.price ? `₹${course.price}` : "₹ N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          course?.isPublished
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {course?.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <FaEdit
                        className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={() =>
                          navigation(`/editcourses/${course?._id}`)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-400 py-6 italic"
                  >
                    No courses created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* Cards for Mobile */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.length > 0 ? (
            creatorCourseData.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={course?.thumbnail || img}
                    alt={course?.title}
                    className="w-16 h-16 rounded-md object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-sm">
                      {course?.title || "Untitled Course"}
                    </h2>
                    <p className="text-gray-600 text-xs mt-1">
                      {course?.price ? `₹${course.price}` : "₹ N/A"}
                    </p>
                  </div>
                  <FaEdit
                    className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    onClick={() =>
                      navigation(`/editcourses/${course?._id}`)
                    }
                  />
                </div>
                <span
                  className={`w-fit px-3 py-1 text-xs rounded-full ${
                    course?.isPublished
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 mt-4">
              No courses created yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
