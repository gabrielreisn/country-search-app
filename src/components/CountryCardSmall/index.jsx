import React from 'react';
import {cardStyles} from './styles'

export const CountryCardSmall = ({ src, alt, countryName }) => {
  return (
    <div className={cardStyles}>
      <img src={src} alt={alt} />
      <span>{countryName}</span>
    </div>
  );
};
