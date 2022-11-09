import { useEffect } from 'react'
import AnecodoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setAnecdote } from './reducers/store'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
      .getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecodoteForm />
    </div>
  )
}

export default App