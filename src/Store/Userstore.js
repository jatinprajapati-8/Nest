import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/Userslice";
import postslice from "../Slice/postslice";
import singlepostslice from "../Slice/singlepostslice";


const Store = configureStore({
    reducer : {
        userstate : userSlice,
        poststate : postslice,
        singlepoststate: singlepostslice,
    }
})

export default Store