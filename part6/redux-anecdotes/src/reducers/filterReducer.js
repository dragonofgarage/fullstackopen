import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers:{
    setFilter(state, action) {
      const data = action.payload
      return data
    }
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer