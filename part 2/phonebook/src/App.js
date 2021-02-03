import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const filteredPeople = persons.map(n => n).filter(n => n.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNotificationMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setNewName('')
          setNumber('')
          console.log(personObject)
        })
        .catch(error => { 
                setErrorMessage(`${error.response.data.message}`)
                console.log(error.response.data)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 7000)
              })

    // if (persons.some(n => n.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase()) || persons.some(n => n.number === newNumber)) {
    //   window.confirm(`${newName} is already added to the phonebook would you like to update the number?`)
    //   const contact = persons.find(n => n.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase())
    //   const changedContact = { ...contact, number: newNumber }
    //   personService
    //     .update(changedContact.id, changedContact)
    //     .then(returnedContact => {
    //       setPersons(persons.map(person => person.name !== changedContact.name ? person : returnedContact))
    //       setNotificationMessage(`Updated ${contact.name}`)
    //       setTimeout(() => {
    //         setNotificationMessage(null)
    //       }, 3000)
    //       setNewName('')
    //       setNumber('')
    //     })
    //     .catch(error => { 
    //       setErrorMessage(`Contact of ${contact.name} already removed from server`)
    //       setTimeout(() => {
    //         setErrorMessage(null)
    //       }, 3000)
    //     })
    // }

    // else {
    //   personService
    //     .create(personObject)
    //     .then(response => {
    //       setPersons(persons.concat(response))
    //       setNotificationMessage(`Added ${personObject.name}`)
    //       setTimeout(() => {
    //         setNotificationMessage(null)
    //       }, 3000)
    //       setNewName('')
    //       setNumber('')
    //       console.log(personObject)
    //     })
    //     // .catch(error => { 
    //     //   setErrorMessage(`${error.response.data}`)
    //     //   console.log(error.response.data)
    //     //   setTimeout(() => {
    //     //     setErrorMessage(null)
    //     //   }, 3000)
    //     // })
      
    // }
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
    console.log(id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .deleteResource(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          console.log(persons)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
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