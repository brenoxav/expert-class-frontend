import React from 'react';
import { HashRouter } from 'react-router-dom';
import {
  render, cleanup, waitFor, fireEvent,
} from '../tests/test-utils';
import AddClassPage from '../pages/addClassPage/addClassPage';

afterEach(cleanup);

describe('Add Class Page', () => {
  const customState = {
    users: {
      user: {
        id: 1,
        username: 'john_doe',
        name: 'john',
        created_at: '2020-11-05T23:43:07.938Z',
        updated_at: '2020-11-05T23:43:07.938Z',
      },
      logged_in: true,
      status: 'fulfilled',
      error: null,
    },
  };

  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render(
      <HashRouter>
        <AddClassPage />
      </HashRouter>, { initialState: { users: { ...customState.users } } },
    );
  });

  test('Has a submit button for the form', async () => {
    const { getByRole } = renderedComponent;

    await waitFor(() => expect(getByRole('button', { name: /Add/i })).toBeInTheDocument());
  });

  test('Get confirmation message when successfully adding for a class', async () => {
    const {
      getByRole, getByTestId, getByPlaceholderText,
    } = renderedComponent;

    let addBtn;

    // Expect Add Button
    await waitFor(() => {
      addBtn = getByRole('button', { name: /Add/i });
    });

    expect(addBtn).toBeInTheDocument();

    // Expect to See Title input
    const titleInput = getByPlaceholderText('Title');
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'Landscaping' } });
    expect(titleInput).toHaveValue('Landscaping');

    // Expect to See Description input
    const descriptionInput = getByPlaceholderText('Description');
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: 'Learn about the latest techniques and trends in this ever evolving field.' } });
    expect(descriptionInput).toHaveValue('Learn about the latest techniques and trends in this ever evolving field.');

    // Expect to See Duration input
    const durationInput = getByPlaceholderText('Duration');
    expect(durationInput).toBeInTheDocument();
    fireEvent.change(durationInput, { target: { value: 5 } });
    expect(durationInput).toHaveValue(5);

    // Expect to See Instructor input
    const instructorInput = getByPlaceholderText('Instructor');
    expect(instructorInput).toBeInTheDocument();
    fireEvent.change(instructorInput, { target: { value: 'Andrés Segovia' } });
    expect(instructorInput).toHaveValue('Andrés Segovia');

    // Expect to See Image input
    const fileInput = getByTestId('imageInput');
    expect(fileInput).toBeInTheDocument();
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    // Expect file to be uploaded to input
    fireEvent.change(fileInput, { target: { files: file } });
    expect(fileInput.files).toStrictEqual(file);
    expect(fileInput.files.name).toBe('chucknorris.png');

    // Expect to See Confirmation Message after submitting form successfully
    fireEvent.click(addBtn);
    const successMsg = await waitFor(() => getByTestId('flashMessage'));
    expect(successMsg).toBeInTheDocument();
    expect(successMsg.textContent).toBe('Course successfully created');
  });

  test('See validation message when there\'s an empty field in the form', async () => {
    const {
      getByRole, queryByText, getByPlaceholderText,
    } = renderedComponent;

    let addBtn;

    // Expect Register Button
    await waitFor(() => {
      addBtn = getByRole('button', { name: /Add/i });
    });

    expect(addBtn).toBeInTheDocument();

    // Expect to See Title input
    const titleInput = getByPlaceholderText('Title');
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'Landscaping' } });
    expect(titleInput).toHaveValue('Landscaping');

    // Expect to See Description input
    const descriptionInput = getByPlaceholderText('Description');
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: 'Learn about the latest techniques and trends in this ever evolving field.' } });
    expect(descriptionInput).toHaveValue('Learn about the latest techniques and trends in this ever evolving field.');

    // Expect to See Duration input
    const durationInput = getByPlaceholderText('Duration');
    expect(durationInput).toBeInTheDocument();

    // Expect to See Validation Message
    fireEvent.submit(addBtn);
    expect(queryByText('Please fill out this field.')).toBeInTheDocument();
  });

  test('See validation message when there\'s an empty field for the image upload field', async () => {
    const {
      getByRole, getByTestId, queryByText, getByPlaceholderText,
    } = renderedComponent;

    let addBtn;

    // Expect Register Button
    await waitFor(() => {
      addBtn = getByRole('button', { name: /Add/i });
    });

    expect(addBtn).toBeInTheDocument();

    // Expect to See Title input
    const titleInput = getByPlaceholderText('Title');
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'Landscaping' } });
    expect(titleInput).toHaveValue('Landscaping');

    // Expect to See Description input
    const descriptionInput = getByPlaceholderText('Description');
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: 'Learn about the latest techniques and trends in this ever evolving field.' } });
    expect(descriptionInput).toHaveValue('Learn about the latest techniques and trends in this ever evolving field.');

    // Expect to See Duration input
    const durationInput = getByPlaceholderText('Duration');
    expect(durationInput).toBeInTheDocument();
    fireEvent.change(durationInput, { target: { value: 5 } });
    expect(durationInput).toHaveValue(5);

    // Expect to See Instructor input
    const instructorInput = getByPlaceholderText('Instructor');
    expect(instructorInput).toBeInTheDocument();
    fireEvent.change(instructorInput, { target: { value: 'Andrés Segovia' } });
    expect(instructorInput).toHaveValue('Andrés Segovia');

    // Expect to See Image input
    const fileInput = getByTestId('imageInput');
    expect(fileInput).toBeInTheDocument();
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    // Expect to See Validation Message
    fireEvent.submit(addBtn);
    expect(queryByText('Please upload a picture of the instructor.')).toBeInTheDocument();

    fireEvent.change(fileInput, { target: { files: file } });
    expect(fileInput.files).toStrictEqual(file);
    expect(fileInput.files.name).toBe('chucknorris.png');

    // Expect to See Confirmation Message after submitting form successfully
    fireEvent.click(addBtn);
    const successMsg = await waitFor(() => getByTestId('flashMessage'));
    expect(successMsg).toBeInTheDocument();
    expect(successMsg.textContent).toBe('Course successfully created');
  });
});
