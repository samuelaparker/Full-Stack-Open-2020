import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  const filteredPeople = persons.map(n => n).filter(n => n.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (persons.some(n => n.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase()) || persons.some(n => n.number === newNumber)) {
      window.confirm(`${newName} is already added to the phonebook would you like to update the number?`)
      const contact = persons.find(n => n.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase())
      const changedContact = { ...contact, number: newNumber }
      personService
        .update(changedContact.id, changedContact)
        .then(returnedContact => {
          setPersons(persons.map(person => person.name !== changedContact.name ? person : returnedContact))
          setNewName('')
          setNumber('')
        })
        .catch(error => { console.log(error) })

    }

    else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNumber('')
        })

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

  const deletePerson = (id) => {
    let person = persons.find(n => n.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .deleteResource(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          console.log(error)
        })
    }

  }

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
      <div>
        <h3>Numbers:</h3>
        {filteredPeople.map((person) =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </div>
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

const Person = (props) => {
  return (
    <div>
      <div>
        {props.name} {props.number}
        <button onClick={props.deletePerson}>Delete</button>
      </div>
    </div>

  )
}

export default App