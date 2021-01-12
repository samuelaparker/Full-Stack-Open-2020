import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const filteredCountries = countries.map(n => n).filter(n => n.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))

  return (
    <div>
      <Search handleSearchInput={handleSearchInput} searchInput={searchInput} />
      <RenderData filteredCountries={filteredCountries} />
    </div>
  )
}

const Search = (props) => {
  return (
    <div>Find countries:
      <input
        value={props.searchInput}
        onChange={props.handleSearchInput}
      />
    </div>
  )
}
const ShowInfo = ({filteredCountries, buttonId}) => {
  console.log(filteredCountries[buttonId].capital)
  console.log(buttonId)
  const country = filteredCountries[buttonId]
    return (
      <div>
          <div key={country.numericCode}>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <div>
              {country.languages.map((n, i) => <li key={i}>{n.name}</li>)}
            </div>
            <div>
              <img src={country.flag} alt="Flag" style={{ maxWidth: "250px", marginTop: "25px" }} />
            </div>
          </div>
      </div>
    )
  }

const RenderData = ({ filteredCountries }) => {
  const [clickToggle, setClickToggle] = useState(false)
  const [buttonId, setButtonId] = useState(0)
  
  const triggerShowInfo = (event) => {
    console.log(event.target.id)
    setClickToggle(true)
    setButtonId(event.target.id)
  }
  
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )

  } else if (filteredCountries.length < 10 && filteredCountries.length >= 2) {
    return (
      <div>
        {filteredCountries.map((n, i) => 
        <div key={n.numericCode}>
        <p style={{display : 'inline'}} key={n.numericCode}>{n.name} </p>
        <button id={i} onClick={triggerShowInfo}>show</button>
        </div>
        )
        }
        {clickToggle === true &&
        <ShowInfo filteredCountries={filteredCountries} buttonId={buttonId} />
        }
      </div>
    ) 
  } 

  else
    return (
      <div>
        {filteredCountries.map(({ name, capital, population, languages, flag, numericCode }) =>
          <div key={numericCode}>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <div>
              {languages.map((n, i) => <li key={i}>{n.name}</li>)}
            </div>
            <div>
              <img src={flag} alt="Flag" style={{ maxWidth: "250px", marginTop: "25px" }} />
            </div>
          </div>
        )
        }
      </div>
    )
}

export default App;
