import { createSlice } from "@reduxjs/toolkit";


const courseSlicer = createSlice({
    name:"course",
    initialState:{
        creatorCourseData:null,
        courseData:null
    },
    reducers:{
        setCreatorCourseData:(state,action) => {
            state.creatorCourseData = action.payload
        },
        setCourseData:(state,action) => {
            state.courseData = action.payload
        }
    }
})

export const {setCreatorCourseData} = courseSlicer.actions
export const {setCourseData} = courseSlicer.actions
export default courseSlicer.reducer