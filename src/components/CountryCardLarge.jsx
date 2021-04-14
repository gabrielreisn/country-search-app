import React, {useEffect, useState} from 'react'
import {css} from '@emotion/css'
import { useParams } from 'react-router-dom'
import {numberFormat} from '../helpers'

const largeCardStyle = css`
  height: 100vh;
  display: grid;
  place-content: center;
  background-color: hsl(218, 100%, 98%);

  section {
    max-height: 90vh;
    width: 32vw;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: -2px 2px 10px 0px rgb(0 0 0 / 40%);
    background-color: white;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    min-height: 28vh;


    img {
      width: 100%;
      max-height: 30vh;
      border-radius: 10px 10px 0 0;
    }
  }
  
  .card-body {
    padding: 1rem;

    h1,h2,h3,span {
      font-family: 'Ruda', Sans-Serif;
    }

    h2 {
      font-size: 1.5rem;
    }

    h6 {
      font-family: 'Roboto Mono',monospace;
      font-size: 0.7rem;
      font-weight: bold;
      margin: 0.4rem 0;
      color: #666;
    }
  }
`

export const CountryCardLarge = () => {
  const [country,setCountry] = useState(undefined)
  const { slug } = useParams()

  useEffect(()=>{
    const fetchCountry = async () => {
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${slug}`)
      const data = await res.json()

      console.log('data',data)
      setCountry(data[0])
      // setCountriesList(data)
    }

    fetchCountry()
  },[])

  console.log('kek',country)

  if(!country) return <span>loading...</span>

  return(
    <main className={largeCardStyle}>
      <section>
        <div className='image-wrapper'>
          <img src={country.flag} alt={country.name} />
        </div>
        <div className='card-body'>
          <h2>Hello,<br/> welcome to {country.name} !</h2>
          <h6>Capital</h6>
          <h3>{country.capital}</h3>
          <h6>Population</h6>
          <h3>{numberFormat(country.population)}</h3>
          <hr />
          <h6>Region</h6>
          <h3>{`${country.region} - ${country.subregion}`}</h3>
          <div>
            <h6>currencies</h6>
            {country.currencies.map(e => <span key={e.code + e.name}>{`${e.code} (${e.symbol}) - ${e.name}`}</span>)}
          </div>
        </div>
      </section>
    </main>
  )
}

