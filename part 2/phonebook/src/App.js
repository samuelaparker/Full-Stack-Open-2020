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

  const checkInput = () => {
    if (!newName) {
      setTimeout(() => {
        setErrorMessage(`name required`)
      }, 3000)
      return false
    }
    if (!newNumber) {
      setTimeout(() => {
        setErrorMessage(`number required`)
      }, 3000)
      return false
    }
    if (persons.find(p => p.name === newName && p.number === newNumber)) {
      setTimeout(() => {
        setErrorMessage(
          `${newName} with number ${newNumber} is already in the phonebook.`
        );
      }, 3000)
      return false
    }
    return true
  }
  const checkUpdateExistingNumber = () => {
    const personByName = persons.find(p => p.name === newName);
    const personByNumber = persons.find(p => p.number === newNumber);
    if (personByName && personByNumber) {
      setErrorMessage(
        `There is already a person with name ${newName} (number ${personByName.number}) and there is already number ${newNumber} (belonging to ${personByNumber.name})`
      );
      return true;
    }
    if (!personByName && !personByNumber) {
      return false;
    }
    if (
      personByName &&
      !window.confirm(
        `Name ${newName} is already in the phonebook.\nDo you want to update the number to ${newNumber}?`
      )
    ) {
      return false;
    }
    if (
      personByNumber &&
      !window.confirm(
        `Number ${newNumber} is already in the phonebook.\nDo you want to update the name to ${newName}?`
      )
    ) {
      return false;
    }
    const p = personByName || personByNumber;
    const id = p.id;
    personService
      .update(id, { ...p, name: newName, number: newNumber })
      .then(updatedPerson => {
        setPersons(persons.map(p => (p.id !== id ? p : updatedPerson)));
        setNewName("");
        setNumber("");
        setTimeout(() => {
          setNotificationMessage(`Updated ${p.name}'s number`);
        }, 3000)
      })
      .catch(error => {
        if (setErrorMessage(error, p.name, id)) {
          setNewName("");
          setNumber("");
        } else {
          setTimeout(() => {
            setErrorMessage(
              `Failed to update ${p.name}'s number on the server. ${`${error.response.data.message}`}`
            );
          }, 3000)
        }
      });
    return true;
  };

  const addPerson = event => {
    event.preventDefault();
    if (!checkInput()) {
      return;
    }
    if (checkUpdateExistingNumber()) {
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then(newPerson => {
       setNotificationMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
                  setNotificationMessage(null)
                }, 3000)
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNumber("");
      })
      .catch(error => {
        setTimeout(() => {
          setErrorMessage(`Failed to add ${newPerson.name}. ${`${error.response.data.message}`}`);
        }, 3000)
      });
  };
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