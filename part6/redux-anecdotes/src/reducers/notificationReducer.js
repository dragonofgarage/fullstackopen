import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isDisplay: false,
    data: '',
    time : 0
  },
  reducers: {
    setNewNotification(state, action) {
      const message = action.payload
      const newState = {
        ...state,
        isDisplay: true,
        data: message
      }

      return newState
    },
    cleanNotification(state, action) {
      if(state.isDisplay) {
        const newState = {
          ...state,
          isDisplay: false,
          data: ''
        }
        return newState
      }

      return state
    }
  }
})


export const { displayNotification, cleanNotification, setNewNotification} = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setNewNotification(message))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, time*100);
  }
}

export default notificationSlice.reducer
