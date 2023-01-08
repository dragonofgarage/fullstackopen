import { useParams } from 'react-router-dom'

const Comment = ({ comment }) => {
  return <li>{comment.content}</li>
}

const SingleBlogPage = ({ blogs, comments, handleUpdateLikes }) => {
  const id = useParams().id
  const blog = blogs.find((item) => item.id === String(id))

  const updateLikes = () => {
    const newObj = {
      likes: blog.likes + 1,
    }

    handleUpdateLikes(blog.id, newObj)
  }

  const commentOfBlog = comments.filter((item) => item.blog == String(id))

  if (blog)
    return (
      <main>
        <div>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes <button onClick={updateLikes}>like</button>
          </p>
          <p>added by {blog.author}</p>
        </div>
        <div>
          <h3>comments</h3>
          <ul>
            {commentOfBlog.map((item) => (
              <Comment key={item.id} comment={item} />
            ))}
          </ul>
        </div>
      </main>
    )
}

export default SingleBlogPage
