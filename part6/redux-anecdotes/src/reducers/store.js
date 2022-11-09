import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0)

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
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})



export const { generateVote, createAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer