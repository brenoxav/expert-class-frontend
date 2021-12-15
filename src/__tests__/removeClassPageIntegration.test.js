import React from 'react';
import { HashRouter } from 'react-router-dom';
import {
  render, cleanup, waitFor, fireEvent,
} from '../tests/test-utils';
import RemoveClassPage from '../pages/removeClassPage/removeClassPage';

afterEach(cleanup);

describe('Remove Class Page', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render(
      <HashRouter>
        <RemoveClassPage />
      </HashRouter>,
    );
  });

  test('Shows an index of all classes', async () => {
    const { getAllByTestId } = renderedComponent;

    await waitFor(() => expect(getAllByTestId('classItem')).toHaveLength(2));
  });

  test('There\'s a delete button in each row', async () => {
    const { getAllByTestId } = renderedComponent;

    const removeButtons = await waitFor(() => getAllByTestId('removeBtn'));
    expect(removeButtons).toHaveLength(2);
  });

  test('When a user clicks the delete button of one item, the item is removed from the table rows', async () => {
    const { getAllByTestId, queryByText } = renderedComponent;

    await waitFor(() => expect(getAllByTestId('classItem')).toHaveLength(2));
    const classTitle = queryByText('Singing');
    expect(classTitle).toBeInTheDocument();
    const removeButtons = getAllByTestId('removeBtn');
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[1]);
    await waitFor(() => expect(getAllByTestId('classItem')).toHaveLength(1));
    expect(classTitle).not.toBeInTheDocument();
  });
});
