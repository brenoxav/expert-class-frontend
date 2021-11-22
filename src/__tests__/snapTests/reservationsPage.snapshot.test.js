import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../tests/test-utils';
import ReservationsPage from '../../pages/reservationsPage/reservationsPage';

afterEach(cleanup);

describe('ReservationsPage', () => {
  test('Renders the page', () => {
    const app = renderWithRedux(<ReservationsPage />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
