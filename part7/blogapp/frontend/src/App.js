import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import {
  setBlogs,
  initialStateBlogs,
  updateLikes,
  createBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { initialStateUsers } from './reducers/usersReducer'
import { initialStateComments } from './reducers/commentsReducer'
import { createNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SingleBlogPage from './components/SingleBlogPage'
import comments from './services/comments'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const noteFormRef = useRef()

  const dispatch = useDispatch()

  const { message, error } = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  //this user variable is used to save the present login user
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    dispatch(initialStateBlogs())
    dispatch(initialStateUsers())
    dispatch(initialStateComments())
  }, [dispatch])

  //get token
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      dispatch(
        createNotification(
          `${user.username} has logged in successfully`,
          false,
          2
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(createNotification('wrong username or password', true, 2))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const handleCreateBlog = async (newObject) => {
    try {
      noteFormRef.current.toggleVisibility()
      dispatch(createBlog(blogs, user, newObject))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLikes = async (id, newObjcet) => {
    try {
      dispatch(updateLikes(blogs, id, newObjcet))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
      dispatch(createNotification('remove successful', false, 2))
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null || user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} isError={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <Router>
      <div>
        <nav className="navigation">
          <Link to={'/'}>blogs</Link>
          <Link to={'/users'}>users</Link>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </nav>
        <Notification message={message} isError={error} />
        <h2>blog app</h2>
      </div>

      <Routes>
        <Route path="/users" element=<Users users={users} /> />
        <Route path="/users/:id" element=<User users={users} /> />
        <Route
          path="/"
          element={
            <Home
              noteFormRef={noteFormRef}
              handleCreateBlog={handleCreateBlog}
              handleRemoveBlog={handleRemoveBlog}
              handleUpdateLikes={handleUpdateLikes}
              blogs={blogs}
              user={user}
            />
          }
        />
        <Route
          path="/blogs/:id"
          element=<SingleBlogPage
            blogs={blogs}
            comments={comments}
            handleUpdateLikes={handleUpdateLikes}
          />
        />
      </Routes>
    </Router>
  )
}

export default App
