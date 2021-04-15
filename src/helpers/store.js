import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers'

const store = configureStore({
  reducer: {
    country: countryReducer
  }
})

export default store