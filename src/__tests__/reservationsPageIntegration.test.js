import React from 'react';
import { HashRouter } from 'react-router-dom';
import {
  render, cleanup, waitFor,
} from '../tests/test-utils';
import ReservationsPage from '../pages/reservationsPage/reservationsPage';

afterEach(cleanup);

describe('Reservations Page', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render(
      <HashRouter>
        <ReservationsPage />
      </HashRouter>,
    );
  });

  test('Shows available reservations', async () => {
    const { getByText, getAllByText } = renderedComponent;

    const reservations = await waitFor(() => getAllByText('Username: john'));
    expect(reservations).toHaveLength(3);
    expect(getByText('Class: Photography')).toBeInTheDocument();
  });
});
