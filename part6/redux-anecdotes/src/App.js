import { useSelector, useDispatch } from 'react-redux'
import { generateVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  //array sorted method
  const byVotes = (a,b) => b.votes > a.votes ? 1 : -1
  const anecdotes = useSelector(state => state).map(a => a).sort(byVotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(generateVote(id))
  }

  const addOne = (event) => {
    event.preventDefault()
    const content = event.target.sentence.value
    event.target.sentence.value = ''
    dispatch(createAnecdote(content))
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
      <h2>create new</h2>
      <form onSubmit={addOne}>
        <div><input name="sentence"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App