import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes'

/* const getId = () => (100000 * Math.random()).toFixed(0)
 */
/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    generateVote(state, action) {
      const id = action.payload
      const objectToChange = state.find(item => item.id === id)
      const voteChange = {
        ...objectToChange,
        votes: objectToChange.votes + 1
      }
      return state.map(item => item.id === id? voteChange : item)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})



export const { generateVote, createAnecdote, setAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer