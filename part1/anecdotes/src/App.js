import { useState } from 'react'

const Button = (props) => (
  <button onClick = {props.onClick}>{props.text}</button>
)

const Display = (props) => {
  return(
    <tbody>
      <tr>
        <td>
          <h1>
            { props.headline }
          </h1>
        </td>
      </tr>
      <tr>
        <td height={50}>
          {props.anecdotes}
        </td>
      </tr>
      <tr>
        <td height={50}>
          has { props.points } votes. 
        </td>
      </tr>
    </tbody>
  )
    
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)


  //State of Points
  const [points, setPoints] = useState(new Array(7).fill(0))

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length ))
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  //Return the index of max value in points.
  const returnMax = () => {
    let max = 0
    for(let i = 1; i < points.length; i++)
    {
      if(points[max] < points[i])
        max = i
    }
    return max
  }

  return (
    <div>
      <table>
        <Display headline = "Anecdote of the day"
          anecdotes = {anecdotes[selected]}
          points = {points[selected]} />
        <tbody>
          <tr height = {50} >
            <td>
              <Button onClick = {handleClick} text = "next" />
              <Button onClick = {handleVote} text = "vote" />
            </td>
          </tr>
        </tbody>
        <Display headline = "Anecdote with most votes"
          anecdotes = {anecdotes[returnMax()]}
          points = {points[returnMax()]} />
      </table>
    </div>
  )
}

export default App