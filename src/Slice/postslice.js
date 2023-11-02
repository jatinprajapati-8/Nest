import { createSlice } from "@reduxjs/toolkit";


const postslice = createSlice({
    name:"posts",
    initialState:{
        posts:null,
        isloading:true,
        error:null
    },
    reducers:{
        getpost:(state,action) => {
            state.posts = action.payload;
            state.isloading = false;
        }
    }
})

export default postslice.reducer;
export const {getpost} = postslice.actions