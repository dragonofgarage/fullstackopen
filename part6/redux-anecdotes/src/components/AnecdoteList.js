import { generateVote } from "../reducers/store"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"


const AnecdoteList = () => {
  const dispatch = useDispatch()

  //array sorted method
  const byVotes = (a,b) => b.votes > a.votes ? 1 : -1

  //This place "state -> state" , after using toolkit/ combinning reducer, has to be chaged as state.anecdote
  //otherwise, the app will always raise errors.
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdote)
    .filter(
      item => {
        if(!filter)
          return item
        else {
          let regexp = new RegExp(`${filter}`,"i")
          return item.content.match(regexp) ? 1 : 0
        }
    }).sort(byVotes)
  
  const vote = async (anecdote) => {
    dispatch(generateVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }
  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList