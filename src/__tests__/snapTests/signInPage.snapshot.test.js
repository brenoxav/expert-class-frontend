import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactRouter from 'react-router';
import { renderWithRedux } from '../../tests/test-utils';
import SignInPage from '../../pages/signInPage/signInPage';

afterEach(cleanup);

describe('SignIn Page', () => {
  test('Renders the page', () => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue({ state: { from: 'classes' } });

    const app = renderWithRedux(<SignInPage />).toJSON();

    expect(app).toMatchSnapshot();
  });
});
