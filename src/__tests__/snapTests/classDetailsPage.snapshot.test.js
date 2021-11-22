import React from 'react';
import { cleanup } from '@testing-library/react';
import ReactRouter from 'react-router';
import { renderWithRedux } from '../../tests/test-utils';

import ClassDetails from '../../pages/classDetailsPage/classDetailsPage';

afterEach(cleanup);

describe('Class Details Page', () => {
  test('Renders the page', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 19 });
    const app = renderWithRedux(<ClassDetails />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
