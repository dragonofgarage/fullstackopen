import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/store"
import { setNotification, cleanNotification } from "../reducers/notificationReducer"


const AnecodoteForm = () => {
  const dispatch = useDispatch()

  const addOne = (event) => {
    event.preventDefault()
    const content = event.target.sentence.value
    event.target.sentence.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, 1000);
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

export default AnecodoteForm