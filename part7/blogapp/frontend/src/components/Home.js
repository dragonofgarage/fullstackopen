import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { TableCell, TableHead, TableRow } from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Showing Button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
