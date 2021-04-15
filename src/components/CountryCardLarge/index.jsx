import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { largeCardStyle } from './styles';
import Loader from '../Loader'
import GenericError from '../GenericError'
import { numberFormat } from '../../helpers';
import { fetchSingleCountry } from '../../redux/countryReducer';

export const CountryCardLarge = () => {
  const { slug } = useParams();

  const { current: country, loading, error } = useSelector((state) => state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleCountry(slug));
  }, [dispatch]);

  if (loading) return <Loader />

  if (error) return <GenericError />

  return (
    <main className={largeCardStyle}>
      <section>
        <div className="image-wrapper">
          <img src={country.flag} alt={country.name} />
        </div>
        <div className="card-body">
          <h2>
            Hello,
            <br /> welcome to {country.name} !
          </h2>
          <h6>Capital</h6>
          <h3>{country.capital}</h3>
          <h6>Population</h6>
          <h3>{numberFormat(country.population)}</h3>
          <hr />
          <h6>Region</h6>
          <h3>{`${country.region} - ${country.subregion}`}</h3>
          <div>
            <h6>currencies</h6>
            {country?.currencies?.map((e) => (
              <span key={e.code + e.name}>{`${e.code} (${e.symbol}) - ${e.name}`}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
