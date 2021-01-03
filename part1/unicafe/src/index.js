import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ average, positive, total }) => {
  if (total >= 1) {
    return (
      <div>
        <h1>statistics</h1>
        <p>average {average}</p>
        <p>postive {positive}</p>
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
      <button onClick={() => { setGood(good + 1); setTotal(total + 1) }}>good</button>
      <button onClick={() => { setNeutral(neutral + 1); setTotal(total + 1) }}>neutral</button>
      <button onClick={() => { setBad(bad + 1); setTotal(total + 1) }}>bad</button>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <Statistics average={average} positive={positive} total={total} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)