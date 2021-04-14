import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {numberFormat} from '../../helpers'
import {largeCardStyle} from './styles'

export const CountryCardLarge = () => {
  const [country,setCountry] = useState(undefined)
  const { slug } = useParams()

  useEffect(()=>{
    const fetchCountry = async () => {
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${slug}`)
      const data = await res.json()

      setCountry(data[0])
    }

    fetchCountry()
  },[])

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

