import { createSlice } from "@reduxjs/toolkit";

const notificationAtStart = [
  'hello world',
]

const initialState = notificationAtStart.map(item => item)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return state
    }
  }
})

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer
