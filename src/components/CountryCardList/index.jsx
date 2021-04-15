import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { pageStyles } from './styles';
import { CountryCardSmall } from '../CountryCardSmall';
import { fetchAvailableCountries } from '../../redux/countryReducer';

export const CountryCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { countries: countriesList, loading, error } = useSelector((state) => state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableCountries());
  }, [dispatch]);

  const changeQueryWithDelay = debounce(setSearchQuery, 50);

  if (loading) return <span>loading....</span>;

  if (error) return <span>error :(</span>;

  return (
    <div className={pageStyles}>
      <div className="search-box">
        <label>
          <input
            type="text"
            placeholder="Filter your countries here"
            onChange={(e) => changeQueryWithDelay(e.target.value)}
          />
        </label>
      </div>
      <section>
        {countriesList
          .filter((country) => {
            if (searchQuery === '') return country;
            return country.name.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map((country) => (
            <Link to={`/country/${country.name}`} key={country.name}>
              <CountryCardSmall src={country.flag} countryName={country.name} />
            </Link>
          ))}
      </section>
    </div>
  );
};
