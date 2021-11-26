import { rest } from 'msw';

const baseURL = 'https://expert-class-backend.herokuapp.com/api/v1/';

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
    logged_in: false,
  },
  logout: {
    logged_out: true,
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
  reservations: [
    {
      user: 'john',
      course: 'Singing',
      city: 'New York, USA',
      date: '2021-11-13',
      id: 36,
      created_at: '2021-11-11T14:21:26.409Z',
      updated_at: '2021-11-11T14:21:26.409Z',
    },
    {
      user: 'john',
      course: 'Yoga',
      city: 'New York, USA',
      date: '2021-11-14',
      id: 37,
      created_at: '2021-11-12T16:04:34.791Z',
      updated_at: '2021-11-12T16:04:34.791Z',
    },
    {
      user: 'john',
      course: 'Photography',
      city: 'Abuja, Nigeria',
      date: '2021-11-20',
      id: 41,
      created_at: '2021-11-14T21:31:05.624Z',
      updated_at: '2021-11-14T21:31:05.624Z',
    },
  ],
};

const handlers = [
  rest.get(`${baseURL}signed_in`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.signedIn),
  )),
  rest.post(`${baseURL}sign_in`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.signIn),
  )),
  rest.delete(`${baseURL}sign_out`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.logout),
  )),
  rest.get(`${baseURL}courses`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.classes),
  )),
  rest.get(`${baseURL}cities`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.cities),
  )),
  rest.get(`${baseURL}reservations`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockApiResponses.reservations),
  )),
  /* rest.get(countriesUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(countriesMockJsonResponse),
  )), */
];

export default handlers;
