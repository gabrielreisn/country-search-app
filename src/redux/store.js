import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './countryReducer'

const store = configureStore({
  reducer: {
    country: countryReducer
  }
})

export default store