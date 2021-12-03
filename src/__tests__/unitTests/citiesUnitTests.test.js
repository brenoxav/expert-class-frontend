import citiesReducer, { fetchCities } from '../../pages/reservePage/citiesSlice';

const initialState = {
  status: 'idle',
  error: null,
  cities: [],
};

describe('citiesReducer', () => {
  test('should return the initial state', () => {
    expect(citiesReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchCities action', () => {
    test('should handle payload from successful request', () => {
      const payload = [
        {
          id: 33,
          name: 'Ciudad de Mexico, Mexico',
          created_at: '2021-11-05T23:43:07.943Z',
          updated_at: '2021-11-05T23:43:07.943Z',
        },
        {
          id: 34,
          name: 'New York, USA',
          created_at: '2021-11-05T23:43:07.953Z',
          updated_at: '2021-11-05T23:43:07.953Z',
        },
        {
          id: 35,
          name: 'Abuja, Nigeria',
          created_at: '2021-11-05T23:43:07.959Z',
          updated_at: '2021-11-05T23:43:07.959Z',
        },
        {
          id: 36,
          name: 'São Paulo, Brasil',
          created_at: '2021-11-05T23:43:07.965Z',
          updated_at: '2021-11-05T23:43:07.965Z',
        },
      ];

      expect(citiesReducer(initialState, fetchCities.fulfilled(payload))).toEqual(
        {
          cities: payload,
          status: 'fulfilled',
          error: null,
        },
      );
    });
  });
});
