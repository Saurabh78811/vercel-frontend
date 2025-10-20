import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./userSlicer"
import courseSlicer from "./courseSlicer"


export const store = configureStore({
    reducer:{
        user:userSlice,
        course:courseSlicer
    }
})