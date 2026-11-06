import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCountries, getCountryByName } from '../api/countries';

export const fetchAvailableCountries = createAsyncThunk('country/fetchAllCountries', async (_, { getState }) => {
  const {
    country: { countries },
  } = getState();

  if (!!countries.length) return countries;

  return getAllCountries();
});

export const fetchSingleCountry = createAsyncThunk('country/fetchSingleCountry', async (slug, { getState }) => {
  const {
    country: { countries },
  } = getState();

  const result = countries.find((country) => country.name.toLowerCase() === slug.toLowerCase());
  if (result) return result;

  return getCountryByName(slug);
});

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    loading: false,
    error: false,
    current: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableCountries.fulfilled, (state, { payload }) => {
        state.countries = payload;
        state.loading = false;
      })
      .addCase(fetchAvailableCountries.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchSingleCountry.pending, (state) => {
        state.current = {};
        state.loading = true;
      })
      .addCase(fetchSingleCountry.fulfilled, (state, { payload }) => {
        state.current = payload;
        state.loading = false;
      })
      .addCase(fetchSingleCountry.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default countrySlice.reducer;
