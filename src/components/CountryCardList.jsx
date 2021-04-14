import React, {useEffect, useState} from 'react'
import { Link } from  'react-router-dom'
import {css} from '@emotion/css'
import debounce from 'lodash/debounce'
import {CountryCardSmall} from './CountryCardSmall'


const pageStyles = css`

  .search-box {
    display: grid;
    place-content: center;
    height: 10vh;

    position: sticky;
    top: 0;

    input {
      font-family: 'Ruda', Sans-Serif;
      width: 40vw;
      height: 5vh;
      padding: 0 1rem;
      border-radius: 10px;
      border: 1px solid hsl(218, 100%, 45%);

      &:focus {
        outline-color: hsl(218, 100%, 40%);
      }
    }
  }

  section {
    display:flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      text-decoration-line: none;
    }
  }
`

export const CountryCardList = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await res.json()

      setCountriesList(data)
    }

    fetchCountries()
  },[]) 

  const changeQueryWithDelay = debounce(setSearchQuery,50)

  return(
    <div className={pageStyles}>
      <div className='search-box'>
        <label>
          <input type='text' placeholder="Filter your countries here" onChange={(e) => changeQueryWithDelay(e.target.value)}/> 
        </label>
      </div>
      <section>
        {countriesList
          .filter((country) => {
            if (searchQuery === '') return country
            return country.name.toLowerCase().includes(searchQuery.toLowerCase())
          })
          .map(country => 
            <Link to={`/country/${country.name}`}>
              <CountryCardSmall key={country.name} src={country.flag} countryName={country.name} />
            </Link>
          )}
      </section>
    </div>
  )
}