import { rest } from 'msw';

const baseURL = 'https://expert-class-backend.herokuapp.com/api/v1/';

// const gniUrl = 'http://api.worldbank.org/v2/country/all/indicator/NY.GNP.PCAP.CD';
// const baseURL = 'http://api.worldbank.org/v2/country/all/indicator/NY.GNP.PCAP.CD?format=json&per_page=300&mrnev=1';

const mockApiResponses = {
  signIn: {
    status: 'created',
    logged_in: true,
    user: {
      id: 1,
      username: 'john_doe',
      name: 'john',
      created_at: '2020-11-05T23:43:07.938Z',
      updated_at: '2020-11-05T23:43:07.938Z',
    },
  },
  signedIn: {
    /* logged_in: true,
    user: {
      id: 39,
      username: 'john_doe',
      name: 'john',
      created_at: '2020-11-05T23:43:07.938Z',
      updated_at: '2020-11-05T23:43:07.938Z',
    }, */
    status: 401,
  },
  classes: [
    {
      id: 19,
      title: 'English Composition',
      description: 'Learn how to draft professional essays',
      instructor: 'Jeremy Campbell',
      duration: 4,
      created_at: '2021-11-11T04:20:38.165Z',
      updated_at: '2021-11-11T04:20:38.181Z',
      course_image_url: './images/fakeExpertPic1.jpeg',
    },
    {
      id: 21,
      title: 'Singing',
      description: 'Learn to sing',
      instructor: 'Jackie',
      duration: 5,
      created_at: '2021-11-11T14:20:44.084Z',
      updated_at: '2021-11-11T14:20:44.097Z',
      course_image_url: './images/fakeExpertPic2.jpeg',
    },
  ],
  cities: [
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
  ],
};
/* const gniMockJsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: 50,
    total: 3,
    sourceid: '2',
    sourcename: 'World Development Indicators',
    lastupdated: '2021-07-30',
  },
  [
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'XU',
        value: 'North America',
      },
      countryiso3code: 'NAC',
      date: '2020',
      value: 63921.605596663,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: '8S',
        value: 'South Asia',
      },
      countryiso3code: 'SAS',
      date: '2020',
      value: 1820.60030063242,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'ZG',
        value: 'Sub-Saharan Africa',
      },
      countryiso3code: 'SSF',
      date: '2020',
      value: 1478.56962278708,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
  ],
]; */

/* const countriesUrl = 'https://api.worldbank.org/v2/country/all/';
const countriesMockJsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: '100',
    total: 8,
  },
  [
    {
      id: 'AFG',
      iso2Code: 'AF',
      name: 'Afghanistan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LIC',
        iso2code: 'XM',
        value: 'Low income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Kabul',
      longitude: '69.1761',
      latitude: '34.5228',
    },
    {
      id: 'BGD',
      iso2Code: 'BD',
      name: 'Bangladesh',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Dhaka',
      longitude: '90.4113',
      latitude: '23.7055',
    },
    {
      id: 'BTN',
      iso2Code: 'BT',
      name: 'Bhutan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Thimphu',
      longitude: '89.6177',
      latitude: '27.5768',
    },
    {
      id: 'IND',
      iso2Code: 'IN',
      name: 'India',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IBD',
        iso2code: 'XF',
        value: 'IBRD',
      },
      capitalCity: 'New Delhi',
      longitude: '77.225',
      latitude: '28.6353',
    },
    {
      id: 'PAK',
      iso2Code: 'PK',
      name: 'Pakistan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDB',
        iso2code: 'XH',
        value: 'Blend',
      },
      capitalCity: 'Islamabad',
      longitude: '72.8',
      latitude: '30.5167',
    },
  ],
]; */

/* const response = await expertClassApi.post('users', { user: params });
      return response.data; */
const handlers = [
  rest.get(`${baseURL}signed_in`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.signedIn),
  )),
  rest.post(`${baseURL}sign_in`, (req, res, ctx) => res(
    // Respond with a 200 status code
    ctx.status(200),
    ctx.json(mockApiResponses.signIn),
  )),
  rest.get(`${baseURL}courses`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.classes),
  )),
  rest.get(`${baseURL}cities`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.cities),
  )),
  /* rest.get(countriesUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(countriesMockJsonResponse),
  )), */
];

export default handlers;
