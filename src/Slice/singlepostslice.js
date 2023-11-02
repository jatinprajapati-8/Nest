import { createSlice } from "@reduxjs/toolkit";

const singlepostslice = createSlice({
  name: "singlepost",
  initialState: {
    post: null,
  },
  reducers: {
    setpost : (state,action) => {
        state.post = action.payload
    }
  },
});


export default singlepostslice.reducer
export const {setpost} = singlepostslice.actions;