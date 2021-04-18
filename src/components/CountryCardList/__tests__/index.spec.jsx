import React from  'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {render,screen,fireEvent,waitFor} from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import {CountryCardList} from '../index'
import countryReducer from  '../../../redux/countryReducer'

const fakeStore = (initialState) => configureStore({
  reducer: countryReducer,
  preloadedState: initialState
  
})

describe('CountryCardList',()=>{
  test('loads the correct country list',()=>{
    const preloadedState = {
      country: {
        countries: [
          {
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
          {
            "name": "Argentina",
            "capital": "Buenos Aires",
            "region": "Americas",
            "subregion": "South America",
            "population": 43590400,
            "currencies": [
              {
                "code": "ARS",
                "name": "Argentine peso",
                "symbol": "$"
              }
            ],
            "flag": "https://restcountries.eu/data/arg.svg",

          },
          {
            "name": "Armenia",
            "capital": "Yerevan",
            "region": "Asia",
            "subregion": "Western Asia",
            "population": 2994400,
            "currencies": [
              {
                "code": "AMD",
                "name": "Armenian dram",
                "symbol": null
              }
            ],
            "flag": "https://restcountries.eu/data/arm.svg",
          },
        ],
        loading: false,
        error: false,
        current: {},
      }
    }

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardList />
        </Provider>
      </MemoryRouter>
      )

      expect(screen.getByText(/Andorra/i)).toBeInTheDocument()
      expect(screen.getByText(/Argentina/i)).toBeInTheDocument()
      expect(screen.getByText(/Armenia/i)).toBeInTheDocument()
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
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardList />
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
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardList />
        </Provider>
      </MemoryRouter>
      )

      expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('changing the input should filter the right countries', async ()=>{
    const preloadedState = {
      country: {
        countries: [
          {
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
          {
            "name": "Argentina",
            "capital": "Buenos Aires",
            "region": "Americas",
            "subregion": "South America",
            "population": 43590400,
            "currencies": [
              {
                "code": "ARS",
                "name": "Argentine peso",
                "symbol": "$"
              }
            ],
            "flag": "https://restcountries.eu/data/arg.svg",

          },
          {
            "name": "Armenia",
            "capital": "Yerevan",
            "region": "Asia",
            "subregion": "Western Asia",
            "population": 2994400,
            "currencies": [
              {
                "code": "AMD",
                "name": "Armenian dram",
                "symbol": null
              }
            ],
            "flag": "https://restcountries.eu/data/arm.svg",
          },
        ],
        loading: false,
        error: false,
        current: {},
      }
    }

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={fakeStore(preloadedState)}>
          <CountryCardList />
        </Provider>
      </MemoryRouter>
      )

      fireEvent.change(screen.getByPlaceholderText(/Filter your countries here/i),{target: {value: 'argen'}})


      await waitFor(() => {  
        expect(screen.queryByText(/Argentina/i)).toBeInTheDocument()
        expect(screen.queryByText(/Andorra/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Armenia/i)).not.toBeInTheDocument()
      })
    })
})
