import React from  'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {render,screen} from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import {CountryCardLarge} from '../index'
import countryReducer from  '../../../redux/countryReducer'

const fakeStore = (initialState) => configureStore({
  reducer: countryReducer,
  preloadedState: initialState
  
})

describe('CountryCardLarge',()=>{

  afterEach(()=>jest.clearAllMocks())

  test('loads the correct country based on the slug',()=>{
    const preloadedState = {
      country: {
        countries: [],
        loading: false,
        error: false,
        current: {
          "name": "Andorra",
          "capital": "Andorra la Vella",
          "region": "Europe",
          "subregion": "Southern Europe",
          "population": 78014,
          "currencies": [
            {
              "code": "EUR",
              "name": "Euro",
              "symbol": "€"
            }
          ],
          "flag": "https://restcountries.eu/data/and.svg",
        },
      }
    }

    render(
      <MemoryRouter initialEntries={["/country/Andorra"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardLarge />
        </Provider>
      </MemoryRouter>
      )

      expect(screen.getByText(/Welcome to Andorra/i)).toBeInTheDocument()
  })

  test('loads the error state case something goes wrong',()=>{
    const preloadedState = {
      country: {
        countries: [],
        loading: false,
        error: true,
        current: {},
      }
    }

    render(
      <MemoryRouter initialEntries={["/country/Andorra"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardLarge />
        </Provider>
      </MemoryRouter>
      )

      expect(screen.getByText(/Sorry, something went wrong/i)).toBeInTheDocument()
  })

  test('show the loading state for awaiting the results',()=>{
    const preloadedState = {
      country: {
        countries: [],
        loading: true,
        error: false,
        current: {},
      }
    }

    render(
      <MemoryRouter initialEntries={["/country/Andorra"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardLarge />
        </Provider>
      </MemoryRouter>
      )

      expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})

