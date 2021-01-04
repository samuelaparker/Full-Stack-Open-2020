import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({ average, positive, total, good, neutral, bad }) => {
  if (total >= 1) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <th><Statistic text="good" value={good} /></th>
            </tr>
            <tr>
              <th><Statistic text="neutral" value={neutral} /></th>
            </tr>
            <tr>
              <th><Statistic text="bad" value={bad} /></th>
            </tr>
            <tr>
              <th><Statistic text="all" value={total} /></th>
            </tr>
            <tr>
              <th><Statistic text="average" value={average} /></th>
            </tr>
            <tr>
              <th><Statistic text="postive" value={positive} /></th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
}

const Statistic = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const average = (good - bad) / total;
  const positive = (good / total) * 100;



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => { setGood(good + 1); setTotal(total + 1) }} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1); setTotal(total + 1) }} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1); setTotal(total + 1) }} text="bad" />
      <Statistics
        average={average}
        positive={positive}
        total={total}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)