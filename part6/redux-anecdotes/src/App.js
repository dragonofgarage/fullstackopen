import { useSelector, useDispatch } from 'react-redux'
import AnecodoteForm from './components/AnecdoteForm'
import { generateVote } from './reducers/anecdoteReducer'

const App = () => {
  //array sorted method
  const byVotes = (a,b) => b.votes > a.votes ? 1 : -1
  const anecdotes = useSelector(state => state).map(a => a).sort(byVotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(generateVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecodoteForm />
    </div>
  )
}

export default App