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
const ShowInfo = ({filteredCountries}) => {
  console.log(filteredCountries)
    return (
      <div>
        {filteredCountries.map(({ name, capital, population, languages, flag, numericCode }) =>
          <div key={numericCode}>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <div>
              {languages.map(n => <li key={n.so639_1}>{n.name}</li>)}
            </div>
            <div>
              <img src={flag} alt="Flag" style={{ maxWidth: "250px", marginTop: "25px" }} />
            </div>
          </div>
        )
        }
        {}


      </div>
    )
  }

const RenderData = ({ filteredCountries }) => {
  const [clickToggle, setClickToggle] = useState(false)
  
  const triggerShowInfo = () => {
    setClickToggle(true)
    console.log(clickToggle)
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
        {filteredCountries.map((n) => 
        <div key={n.numericCode}>
        <p style={{display : 'inline'}} key={n.numericCode}>{n.name} </p>
        <button onClick={triggerShowInfo}>show</button>
        </div>
        )
        }
        {clickToggle === true &&
        <ShowInfo filteredCountries={filteredCountries} />
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
