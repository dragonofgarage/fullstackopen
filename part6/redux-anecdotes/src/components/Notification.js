import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectNotification = connect(mapStateToProps)(Notification)

export default ConnectNotification