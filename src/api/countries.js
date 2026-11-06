const API_URL = 'https://api.restcountries.com/countries/v5';
const MAX_PAGE_SIZE = 100; // highest `limit` the free plan allows
const RESPONSE_FIELDS = 'names.common,capitals,region,subregion,population,currencies,flag.url_svg';

const request = async (path, params = {}) => {
  const apiKey = import.meta.env.RESTCOUNTRIES_API_KEY;

  if (!apiKey) {
    const message = 'RESTCOUNTRIES_API_KEY is not set, see the README.';
    console.error(message);
    throw new Error(message);
  }

  const query = new URLSearchParams({ ...params, response_fields: RESPONSE_FIELDS });
  const res = await fetch(`${API_URL}${path}?${query}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) throw new Error(`restcountries responded with status ${res.status}`);

  const { data } = await res.json();
  return data;
};

const toCountry = ({ names, capitals = [], region, subregion, population, currencies, flag }) => ({
  name: names.common,
  capital: (capitals.find((capital) => capital.attributes?.primary) ?? capitals[0])?.name,
  region,
  subregion,
  population,
  currencies,
  flag: flag?.url_svg,
});

export const getAllCountries = async () => {
  const countries = [];
  let more = true;

  while (more) {
    const { objects, meta } = await request('', { limit: MAX_PAGE_SIZE, offset: countries.length });
    countries.push(...objects.map(toCountry));
    more = Boolean(meta?.more) && objects.length > 0;
  }

  return countries;
};

// The search matches substrings, so "Guinea" also returns "Equatorial Guinea": prefer the exact name.
export const getCountryByName = async (name) => {
  const { objects } = await request('/name', { q: name });
  const countries = objects.map(toCountry);
  const country = countries.find((c) => c.name.toLowerCase() === name.toLowerCase()) ?? countries[0];

  if (!country) throw new Error(`Country not found: ${name}`);

  return country;
};
