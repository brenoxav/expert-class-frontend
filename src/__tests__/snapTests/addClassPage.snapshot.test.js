import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../tests/test-utils';
import AddClassPage from '../../pages/addClassPage/addClassPage';

afterEach(cleanup);

describe('AddClassPage', () => {
  test('Renders the page', async () => {
    const app = renderWithRedux(<AddClassPage />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
