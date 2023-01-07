import { useParams } from 'react-router-dom'

const SingleBlogPage = ({ blogs, handleUpdateLikes }) => {
  console.log(blogs)
  const id = useParams().id
  const blog = blogs.find((item) => item.id === String(id))

  const updateLikes = () => {
    const newObj = {
      likes: blog.likes + 1,
    }

    handleUpdateLikes(blog.id, newObj)
  }

  if (blog)
    return (
      <div>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes <button onClick={updateLikes}>like</button>
        </p>
        <p>added by {blog.author}</p>
      </div>
    )
}

export default SingleBlogPage
