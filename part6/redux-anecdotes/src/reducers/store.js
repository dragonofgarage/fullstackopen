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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    
    setAnecdote(state, action) {
      return action.payload
    },

    updataList(state, action) {
      return state.map(item => item.id === action.payload.id ? action.payload : item)
    }
  },
})



export const { createAnecdote, setAnecdote, appendAnecdote, updataList } = anecdoteSlice.actions

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

export const generateVote = (object) => {
  return async dispatch => {
    const voteChange = {
      ...object,
      votes: object.votes + 1
    }
    const response = await anecdotesService.addVote(voteChange.id, voteChange)
    dispatch(updataList(response.data))
  }
}

export default anecdoteSlice.reducer