import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRedux } from '../../tests/test-utils';
import ClassesPage from '../../pages/classesPage/classesPage';

afterEach(cleanup);

describe('Classes Page', () => {
  test('Renders the page', () => {
    const app = renderWithRedux(<ClassesPage />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
