import { generateVote } from "../reducers/store"
import { useDispatch, useSelector } from "react-redux"


const AnecdoteList = () => {
  const dispatch = useDispatch()

  //array sorted method
  const byVotes = (a,b) => b.votes > a.votes ? 1 : -1

  //This place "state -> state" , after using toolkit/ combinning reducer, has to be chaged as state.anecdote
  //otherwise, the app will always raise errors.
  const anecdotes = useSelector(state => state.anecdote).map(a => a).sort(byVotes)
  
  const vote = (id) => {
    dispatch(generateVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList