import { connect } from "react-redux"
import { createNew } from "../reducers/store"
import { setNotification } from "../reducers/notificationReducer"


const AnecodoteForm = (props) => {

  const addOne = async (event) => {
    event.preventDefault()
    const content = event.target.sentence.value
    event.target.sentence.value = ''
    props.createNew(content)
    props.setNotification(`you added '${content}'`, 10)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addOne}>
        <div><input name="sentence"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNew,
  setNotification
}

const ConnectAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecodoteForm)



export default ConnectAnecdoteForm