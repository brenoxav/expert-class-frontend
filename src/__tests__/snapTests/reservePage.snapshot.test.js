import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../tests/test-utils';
import ReservePage from '../../pages/reservePage/reservePage';

afterEach(cleanup);

describe('ReservePage', () => {
  test('Renders the page', async () => {
    const app = renderWithRedux(<ReservePage />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
