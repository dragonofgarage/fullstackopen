import { useEffect } from 'react'
import { initialStateUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  //Initial the datas of users
  useEffect(() => {
    dispatch(initialStateUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
