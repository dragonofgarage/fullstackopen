import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((item) => item.id === String(id))

  if (user)
    return (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((item) => {
            return <li key={item.id}>{item.title}</li>
          })}
        </ul>
      </div>
    )
}

export default User
