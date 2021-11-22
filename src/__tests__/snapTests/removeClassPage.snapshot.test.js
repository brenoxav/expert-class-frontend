import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../tests/test-utils';
import RemoveClassPage from '../../pages/removeClassPage/removeClassPage';

afterEach(cleanup);

describe('RemoveClassPage', () => {
  test('Renders the page', async () => {
    const app = renderWithRedux(<RemoveClassPage />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
