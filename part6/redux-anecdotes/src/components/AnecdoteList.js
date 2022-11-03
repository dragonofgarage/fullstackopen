import { generateVote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"


const AnecdoteList = () => {
  const dispatch = useDispatch()

  //array sorted method
  const byVotes = (a,b) => b.votes > a.votes ? 1 : -1
  const anecdotes = useSelector(state => state).map(a => a).sort(byVotes)
  
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