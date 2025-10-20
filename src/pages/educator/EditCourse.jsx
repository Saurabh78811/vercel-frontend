import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import img from "../../assets/imgNot.jpg";
import { serverUrl } from "../../App"; // ✅ make sure this file exports serverUrl
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlicer";

const EditCourses = () => {
  const navigation = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();

  // --- States ---
  const [isPublished, setIsPublished] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)

  // --- Handlers ---
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, {
        withCredentials: true,
      });
      setSelectedCourse(result.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course details");
    }
  };

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      const updateData = result.data
      if(updateData.isPublished){
        const updateCourse = courseData.map(c => c._id === courseId ? updateData : c)
        if(!courseData.some(c => c._id === courseId)){
          updateCourse.push(updateData)
        }
        dispatch(setCourseData(updateCourse))
      }
      else{
        const filterCourse = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourse))
      }
      toast.success("Course updated successfully");
      navigation("/courses");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, {
        withCredentials: true,
      });
      const filterCourse = courseData.filter(c=>c._id !== courseId)
      dispatch(setCourseData(filterCourse))
      toast.success("Course removed");
      navigation("/courses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove course");
    }
  };

  // --- Lifecycle ---
  useEffect(() => {
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setCategory(selectedCourse.category || "");
      setSubtitle(selectedCourse.subTitle || "");
      setDescription(selectedCourse.description || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontendImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse.isPublished || false);
    }
  }, [selectedCourse]);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6 relative">
        <FaArrowLeft
          className="absolute left-0 md:left-2 w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigation("/courses")}
        />
        <h2 className="text-2xl font-semibold text-center md:pl-[60px]">
          Edit Course Information
        </h2>
        <div className="space-x-2 mt-4 md:mt-0">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Go to Lecture Page
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border cursor-pointer hover:bg-green-200 transition"
              onClick={() => setIsPublished(true)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border cursor-pointer hover:bg-red-200 transition"
              onClick={() => setIsPublished(false)}
            >
              Click to Unpublish
            </button>
          )}

          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleRemoveCourse}
          >
            Remove Course
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6 mt-6" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              id="subtitle"
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
              value={subTitle}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="dis" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="dis"
              className="w-full border px-4 py-2 h-24 rounded-md"
              placeholder="Course Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Category, Level, Price */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* Category */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
              <select
                className="w-full border px-4 py-2 rounded-md bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">--Select Category--</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Level */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
              <select
                className="w-full border px-4 py-2 rounded-md bg-white"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              >
                <option value="">--Select Level--</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Course Price (INR)
              </label>
              <input
                id="price"
                type="number"
                className="w-full border px-4 py-1.5 rounded-md"
                placeholder="₹"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
            <input type="file" hidden ref={thumb} accept="image/*" onChange={handleThumbnail} />
          </div>
          <div
            className="relative w-[300px] cursor-pointer group"
            onClick={() => thumb.current.click()}
          >
            <img
              src={frontendImage}
              alt="Thumbnail Preview"
              className="w-full h-full border border-gray-300 rounded-md object-cover group-hover:opacity-80 transition"
            />
            <FaEdit className="w-5 h-5 absolute top-2 right-2 text-gray-700 group-hover:text-black" />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-start gap-4 mt-6">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-7 py-2 rounded-md"
              onClick={() => navigation("/courses")}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-700 border border-black cursor-pointer flex items-center justify-center gap-2"
              onClick={handleEditCourse}
              disabled={loading}
            >
              {loading ? <ClipLoader size={25} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
