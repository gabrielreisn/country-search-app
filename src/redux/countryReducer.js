import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAvailableCountries = createAsyncThunk('country/fetchAllCountries', async (_, { getState }) => {
  const {
    country: { countries },
  } = getState();

  if (!!countries.length) return countries;

  const res = await fetch('https://restcountries.com/v2/all');
  const data = await res.json();

  return data;
});

export const fetchSingleCountry = createAsyncThunk('country/fetchSingleCountry', async (slug, { getState }) => {
  const {
    country: { countries },
  } = getState();

  const result = countries.find((country) => country.name.toLowerCase() === slug.toLowerCase());
  if (result) return result;

  const res = await fetch(`https://restcountries.com/v2/name/${slug}`);
  const data = await res.json();

  return data;
});

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    loading: false,
    error: false,
    current: {},
  },
  extraReducers: {
    [fetchAvailableCountries.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAvailableCountries.fulfilled]: (state, { payload }) => {
      state.countries = payload;
      state.loading = false;
    },
    [fetchAvailableCountries.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
    [fetchSingleCountry.pending]: (state, action) => {
      state.current = {};
      state.loading = true;
    },
    [fetchSingleCountry.fulfilled]: (state, { payload }) => {
      state.current = Array.isArray(payload) ? payload[0] : payload;
      state.loading = false;
    },
    [fetchSingleCountry.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default countrySlice.reducer;
