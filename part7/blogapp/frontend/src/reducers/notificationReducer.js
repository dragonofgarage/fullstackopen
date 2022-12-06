import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    error: false,
  },
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload
      }
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload
      }
    }
  },
})

export const { setMessage, setError } = notificationSlice.actions
export default notificationSlice.reducer

let timeoutId = null

export const createNotification = (message, error, time) => {
  return dispatch => {
    dispatch(setError(error))
    dispatch(setMessage(message))
    
    if(timeoutId)
      clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(setError(!error))
      dispatch(setMessage(null))
    }, time * 1000);
  }
}
