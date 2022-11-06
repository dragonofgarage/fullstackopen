import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification.isDisplay? style :  {display: 'none'}}>
      {notification.data}
    </div>
  )
}

export default Notification