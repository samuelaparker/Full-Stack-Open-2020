import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdotes = ({ selected, tally, maxTallyValue, anecdoteWithMaxVotes }) => {
  if (tally[selected] > maxTallyValue) {
    return (
      <div>
        <h1>Anecdote with most votes:</h1>
        {anecdotes[selected]}
        <div>Has {tally[selected]} votes</div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Anecdote with most votes:</h1>
        {anecdotes[anecdoteWithMaxVotes]}
        <div>Has {maxTallyValue} votes</div>
      </div>
    )
  }
}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [tally, setTally] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const add = () => {
    setSelected(getRandomInt(6));
  }
  const vote = () => {
    const newVote = {
      ...tally
    }
    newVote[selected] += 1
    setTally(newVote)
  }

  let tallyValues = Object.values(tally);
  let maxTallyValue = Math.max(...tallyValues)

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  let anecdoteWithMaxVotes = getKeyByValue(tally, maxTallyValue)

  console.log(maxTallyValue)
  return (
    <div>
      <div>
        <h1>Anecdote of the day:</h1>
        {props.anecdotes[selected]}
        <div>Has {tally[selected]} votes</div>
      </div>
      <div>
        <button onClick={add}>next anecdote</button>
        <button onClick={vote}>vote</button>
      </div>
      <div>
        <Anecdotes selected={selected} tally={tally} maxTallyValue={maxTallyValue} anecdoteWithMaxVotes={anecdoteWithMaxVotes} anecdotes={anecdotes} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)