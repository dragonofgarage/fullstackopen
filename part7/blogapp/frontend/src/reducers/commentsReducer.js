import { createSlice } from '@reduxjs/toolkit'
import commentsService from '../services/comments'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
  },
})

export const { setComments } = commentsSlice.actions

export const initialStateComments = () => {
  return async (dispatch) => {
    const comments = await commentsService.getAll()
    dispatch(setComments(comments))
  }
}

export const createComment = (comments, newObject) => {
  return async (dispatch) => {
    const response = await commentsService.create(newObject)

    dispatch(setComments(comments.concat(response)))
  }
}

export default commentsSlice.reducer
