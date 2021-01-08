import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-2345' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(n => n.name === newName) || persons.some(n =>n.number === newNumber)) {
      alert(`${newName} ${newNumber} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNumber('')
    }
  }
  
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNumber(event.target.value)
  }
   

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input
            value={newName}
            onChange={handleNameInput}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(n => <p key={n.name}>{n.name} {n.number} </p>)}
    </div>
  )
}

export default App