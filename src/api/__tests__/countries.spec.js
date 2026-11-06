import { getAllCountries, getCountryByName } from '../countries';

const apiCountry = (common, overrides = {}) => ({
  names: { common },
  capitals: [
    { name: 'Secondary', attributes: { primary: false } },
    { name: `${common} City`, attributes: { primary: true } },
  ],
  region: 'Americas',
  subregion: 'North America',
  population: 41798407,
  currencies: [{ code: 'CAD', name: 'Canadian dollar', symbol: '$' }],
  flag: { url_svg: `https://flags.restcountries.com/v5/svg/${common}.svg` },
  ...overrides,
});

const respondWith = (objects, meta = {}) =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ data: { objects, meta } }) });

describe('countries api', () => {
  beforeEach(() => {
    vi.stubEnv('RESTCOUNTRIES_API_KEY', 'test-key');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test('sends the api key and maps countries to the shape used by the app', async () => {
    global.fetch.mockReturnValueOnce(respondWith([apiCountry('Canada')], { more: false }));

    await expect(getAllCountries()).resolves.toEqual([
      {
        name: 'Canada',
        capital: 'Canada City',
        region: 'Americas',
        subregion: 'North America',
        population: 41798407,
        currencies: [{ code: 'CAD', name: 'Canadian dollar', symbol: '$' }],
        flag: 'https://flags.restcountries.com/v5/svg/Canada.svg',
      },
    ]);

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain('https://api.restcountries.com/countries/v5?limit=100&offset=0');
    expect(options.headers.Authorization).toBe('Bearer test-key');
  });

  test('walks through every page of results', async () => {
    global.fetch
      .mockReturnValueOnce(respondWith([apiCountry('Andorra'), apiCountry('Brazil')], { more: true }))
      .mockReturnValueOnce(respondWith([apiCountry('Canada')], { more: false }));

    const countries = await getAllCountries();

    expect(countries.map((c) => c.name)).toEqual(['Andorra', 'Brazil', 'Canada']);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[1][0]).toContain('offset=2');
  });

  test('handles countries without a capital', async () => {
    global.fetch.mockReturnValueOnce(respondWith([apiCountry('Antarctica', { capitals: [] })]));

    const [country] = await getAllCountries();

    expect(country.capital).toBeUndefined();
  });

  test('prefers the exact name over other search matches', async () => {
    global.fetch.mockReturnValueOnce(respondWith([apiCountry('Equatorial Guinea'), apiCountry('Guinea')]));

    const country = await getCountryByName('guinea');

    expect(country.name).toBe('Guinea');
    expect(global.fetch.mock.calls[0][0]).toContain('/countries/v5/name?q=guinea');
  });

  test('rejects when no country matches the search', async () => {
    global.fetch.mockReturnValueOnce(respondWith([]));

    await expect(getCountryByName('nowhere')).rejects.toThrow('Country not found');
  });

  test('rejects on an error response instead of parsing it as data', async () => {
    global.fetch.mockReturnValueOnce(Promise.resolve({ ok: false, status: 403 }));

    await expect(getAllCountries()).rejects.toThrow('status 403');
  });

  test('rejects without calling the api when the key is missing', async () => {
    vi.stubEnv('RESTCOUNTRIES_API_KEY', '');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(getAllCountries()).rejects.toThrow('RESTCOUNTRIES_API_KEY');
    expect(global.fetch).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
