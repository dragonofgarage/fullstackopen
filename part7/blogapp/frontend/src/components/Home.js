import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Home = ({
  noteFormRef,
  handleCreateBlog,
  blogs,
  handleUpdateLikes,
  handleRemoveBlog,
  user,
}) => {
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs
        .map((blog) => blog)
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateLikes={handleUpdateLikes}
            handleRemoveBlog={handleRemoveBlog}
            user={user} // pass user info to component
          />
        ))}
    </div>
  )
}

export default Home
