import React from 'react';
import TestRenderer from 'react-test-renderer';
import { act, render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import ReactRouter from 'react-router';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import App from '../App';
import store from '../app/store';
import LandingPage from '../pages/landingPage/landingPage';
import SignInPage from '../pages/signInPage/signInPage';
import SignUpPage from '../pages/signUpPage/signUpPage';
import ClassesPage from '../pages/classesPage/classesPage';
import ClassDetails from '../pages/classDetailsPage/classDetailsPage';
import ReservePage from '../pages/reservePage/reservePage';
import ReservationsPage from '../pages/reservationsPage/reservationsPage';
import AddClassPage from '../pages/addClassPage/addClassPage';
import RemoveClassPage from '../pages/removeClassPage/removeClassPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('App', () => {
  test('Renders the App', () => {
    const app = TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

describe('LandingPage', () => {
  test('Renders the page', () => {
    const app = TestRenderer.create(
      <Provider store={store}>
        <LandingPage />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

describe('SignIn Page', () => {
  test('Renders the page', () => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue({ state: null });

    const app = TestRenderer.create(
      <Provider store={store}>
        <SignInPage />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

describe('SignUp Page', () => {
  test('Renders the page', () => {
    const app = TestRenderer.create(
      <Provider store={store}>
        <SignUpPage />
      </Provider>,
    ).toJSON();
    expect(app).toMatchSnapshot();
  });
});

describe('Classes Page', () => {
  beforeEach(() => {
    const mockAppState = {
      classes: {
        classes: [
          {
            course_image_url: 'https://res.cloudinary.com/hhh6cnm2e/image/upload/11ijaidwrn9s7s5gogab9j6wsmnz.jpeg',

            created_at: '2021-11-11T04:20:38.165Z',

            description: 'Learn how to draft professional essays',

            duration: 4,

            id: 19,

            instructor: 'Jeremy Campbell',

            title: 'English Composition',

            updated_at: '2021-11-11T04:20:38.181Z',
          },
        ],
        status: 'fulfilled',
        error: null,
      },

      users: {
        user: {
          id: 39,
          username: 'arturo_coder',
          name: 'Arturo',
          created_at: '2021-11-05T23:43:07.938Z',
          updated_at: '2021-11-05T23:43:07.938Z',
        },
        logged_in: true,
        status: 'fulfilled',
        error: null,
      },
    };

    useSelector.mockImplementation((callback) => callback(mockAppState));

    TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  test('Renders the page', () => {
    const page = TestRenderer.create(
      <Provider store={store}>
        <Router>
          <ClassesPage />
        </Router>
      </Provider>,
    ).toJSON();

    expect(page).toMatchSnapshot();
  });
});

describe('Class Details Page', () => {
  beforeEach(() => {
    const mockAppState = {
      classes: {
        classes: [
          {
            course_image_url: 'https://res.cloudinary.com/hhh6cnm2e/image/upload/11ijaidwrn9s7s5gogab9j6wsmnz.jpeg',

            created_at: '2021-11-11T04:20:38.165Z',

            description: 'Learn how to draft professional essays',

            duration: 4,

            id: 19,

            instructor: 'Jeremy Campbell',

            title: 'English Composition',

            updated_at: '2021-11-11T04:20:38.181Z',
          },
        ],
        status: 'fulfilled',
        error: null,
      },
      classDetails: {
        classObj: [],
        error: null,
        status: 'idle',
      },
      users: {
        user: {
          id: 39,
          username: 'arturo_coder',
          name: 'Arturo',
          created_at: '2021-11-05T23:43:07.938Z',
          updated_at: '2021-11-05T23:43:07.938Z',
        },
        logged_in: true,
        status: 'fulfilled',
        error: null,
      },
    };

    useSelector.mockImplementation((callback) => callback(mockAppState));

    TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  test('Renders the page', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 19 });

    const page = TestRenderer.create(
      <Provider store={store}>
        <ClassDetails />
      </Provider>,
    ).toJSON();
    expect(page).toMatchSnapshot();
  });
});

// describe('Reserve Page', () => {
//   test('Renders the page', () => {
//     const page = TestRenderer.create(
//       <Provider store={store}>
//         <ReservePage />
//       </Provider>,
//     ).toJSON();
//     expect(page).toMatchSnapshot();
//   });
// });

// describe('Reservations Page', () => {
//   test('Renders the page', () => {
//     const page = TestRenderer.create(
//       <Provider store={store}>
//         <ReservationsPage />
//       </Provider>,
//     ).toJSON();
//     expect(page).toMatchSnapshot();
//   });
// });

// describe('Add Class Page', () => {
//   test('Renders the page', () => {
//     const page = TestRenderer.create(
//       <Provider store={store}>
//         <AddClassPage />
//       </Provider>,
//     ).toJSON();
//     expect(page).toMatchSnapshot();
//   });
// });

// describe('Remove Class Page', () => {
//   test('Renders the page', () => {
//     const page = TestRenderer.create(
//       <Provider store={store}>
//         <RemoveClassPage />
//       </Provider>,
//     ).toJSON();
//     expect(page).toMatchSnapshot();
//   });
// });
