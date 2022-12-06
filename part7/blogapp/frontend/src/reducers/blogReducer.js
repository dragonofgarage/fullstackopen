import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs } = blogSlice.actions

export const initialStateBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateLikes = (blogs, id, newObjcet) => {
  return async (dispatch) => {
    const response = await blogService.update(id, newObjcet)
    dispatch(
      setBlogs(
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...response, user: blog.user }
        )
      )
    )
  }
}

export const createBlog = (blogs, user, newObject) => {
  return async (dispatch) => {
    const response = await blogService.create(newObject)

    dispatch(setBlogs(blogs.concat(response)))
    dispatch(
      createNotification(
        `${response.title} by ${user.username} added`,
        false,
        2
      )
    )
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
  }
}

export default blogSlice.reducer
