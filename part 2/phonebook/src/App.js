import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(n => n.name === newName) || persons.some(n => n.number === newNumber)) {
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

  const handleFilterInput = (event) => {
    setFilterInput(event.target.value)
  }

  const filteredPeople = persons.map(n => n).filter(n => n.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filterInput={filterInput}
        handleFilterInput={handleFilterInput}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <Persons filteredPeople={filteredPeople} />
    </div>
  )
}

const Filter = (props) => {

  return (
    <div>
      filter shown with:
      <input
        value={props.filterInput}
        onChange={props.handleFilterInput}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson} >
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameInput}
          />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const Persons = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {props.filteredPeople.map(n => <p key={n.name}>{n.name} {n.number} </p>)}
      </div>
    </div>

  )
}

export default App