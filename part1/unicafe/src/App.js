import { useState } from 'react'

const Button = (props) =>(
  <button onClick = {props.onClick}>{props.text}</button>
)

const StatisticLine = (props) =>(
  <tr>
    <td colSpan={2}>{props.text}</td>
    <td colSpan={2}>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all

  if(all === 0)
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <h1>Statistics</h1>
            </th>
            </tr>
            <tr>
              <td>No Feedback given</td>
            </tr>
            </thead>
        </table>
      </div>
    )
    else
      return(
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>
                  <h1>Statistics</h1>
                </th>
            </tr>
            </thead>
            <tbody>
              <StatisticLine text = "Good" value = {good} />
              <StatisticLine text = "neutral" value = {neutral} />
              <StatisticLine text = "bad" value = {bad} />
              <StatisticLine text = "all" value = {all} />
              <StatisticLine text = "average" value = {Math.abs(good - bad) / all} />
              <StatisticLine text = "positive" value = {(good / all) * 100 + '%'} />
            </tbody>
          </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const handleGoodClick = () => 
    setGood(good + 1)


  const handleNeutralClick = () => 
    setNeutral(neutral + 1)

  const handleBadClick = () => 
    setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick = {handleGoodClick} text = "good" />
      <Button onClick = {handleNeutralClick} text = "neutral" />
      <Button onClick = {handleBadClick} text = "bad" />
      <Statistics good = {good} neutral = {neutral}
         bad = {bad} all = {all} />
    </div>
  )
}

export default App