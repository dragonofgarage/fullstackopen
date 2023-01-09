import { TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleUpdateLikes, handleRemoveBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  //inline style
  const blogBlock = {
    border: '2px solid black',
    paddingTop: '10px',
    marginBottom: '10px',
    width: '500px',
  }

  const showButtonStyle = {
    verticalAlign: 'text-top',
  }

  const blogListStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }

  const showWhenVisible = { display: showDetail ? '' : 'none' }
  const showRemoveBtn = { display: blog.user[0].id === user.id ? '' : 'none' }

  const handleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const updateLikes = () => {
    const newObject = {
      likes: blog.likes + 1,
    }

    handleUpdateLikes(blog.id, newObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemoveBlog(blog.id)
    }
  }

  return (
    <TableRow className="blog">
      <TableCell component="th" scope="row">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <div style={showWhenVisible} className="blogDetail">
          <ul style={blogListStyle}>
            <li className="blogUrl">{blog.url}</li>
            <li className="likes">
              likes: {blog.likes}
              <button className="likeBtn" onClick={updateLikes}>
                like
              </button>
            </li>
            <li>{blog.author}</li>
          </ul>
          {
            <button style={showRemoveBtn} onClick={removeBlog}>
              remove
            </button>
          }
        </div>
      </TableCell>
      <TableCell style={showButtonStyle} align="right">
        {
          <button onClick={handleShowDetail} className="detailButton">
            {showDetail ? 'hide' : 'view'}
          </button>
        }
      </TableCell>
    </TableRow>
  )
}

export default Blog
