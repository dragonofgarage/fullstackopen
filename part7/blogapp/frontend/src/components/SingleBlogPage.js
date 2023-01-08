import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/commentsReducer'

const Comment = ({ comment }) => {
  return <li>{comment.content}</li>
}

const InputForm = ({ name, value, handleProcess }) => (
  <div className="submit-input">
    <input id={name} type="text" value={value} onChange={handleProcess} />
  </div>
)

const SingleBlogPage = ({ blogs, comments, handleUpdateLikes }) => {
  const [content, setContent] = useState('')

  const id = useParams().id
  const blog = blogs.find((item) => item.id === String(id))

  const dispatch = useDispatch()

  const updateLikes = () => {
    const newObj = {
      likes: blog.likes + 1,
    }

    handleUpdateLikes(blog.id, newObj)
  }

  const handleCreateComment = async (comments, newObjcet) => {
    try {
      dispatch(createComment(comments, newObjcet))
    } catch (error) {
      console.log(error)
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    handleCreateComment(comments, {
      content: content,
      blogId: id,
    })

    setContent('')
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
          <form onSubmit={addComment}>
            <InputForm
              name="comment"
              value={content}
              handleProcess={({ target }) => setContent(target.value)}
            />
            <button className="submit-btn" type="submit">
              add comment
            </button>
          </form>
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
