import React from 'react';
import { HashRouter } from 'react-router-dom';
import {
  render, cleanup, waitFor, fireEvent,
} from '../tests/test-utils';
import ReservePage from '../pages/reservePage/reservePage';

afterEach(cleanup);

describe('Reserve Page', () => {
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
        <ReservePage />
      </HashRouter>, { initialState: { users: { ...customState.users } } },
    );
  });

  test('Has a submit button for the form', async () => {
    const { getByRole } = renderedComponent;

    await waitFor(() => expect(getByRole('button', { name: /Register/i })).toBeInTheDocument());
  });

  test('Get confirmation message when successfully registering for a class', async () => {
    const {
      getByText, getByRole, getByTestId, queryByText,
    } = renderedComponent;

    let registerBtn;

    // Expect Register Button
    await waitFor(() => {
      registerBtn = getByRole('button', { name: /Register/i });
    });

    expect(registerBtn).toBeInTheDocument();

    // Expect to See Courses dropdown button
    const chooseCourseDd = getByText('Choose a Course');
    expect(chooseCourseDd).toBeInTheDocument();
    fireEvent.click(chooseCourseDd);

    const courseSelection = getByText('English Composition');
    fireEvent.click(courseSelection);
    expect(getByText('English Composition')).toBeInTheDocument();
    const nonSelectedCourse = queryByText('Singing');
    expect(nonSelectedCourse).not.toBeInTheDocument();

    // Expect to See Cities dropdown button
    const chooseCityDd = getByText('Choose a City');
    expect(chooseCityDd).toBeInTheDocument();
    fireEvent.click(chooseCityDd);
    const citySelection = getByText('New York, USA');
    fireEvent.click(citySelection);
    expect(getByText('New York, USA')).toBeInTheDocument();
    const nonSelectedCity = queryByText('Abuja, Nigeria');
    expect(nonSelectedCity).not.toBeInTheDocument();

    // Expect to See Date input
    const dateInput = getByTestId('datePicker');
    expect(dateInput).toBeInTheDocument();
    let courseDate = new Date(Date.now() + (3600 * 1000 * 24) * 6);
    courseDate = courseDate.toISOString().substr(0, 10);
    fireEvent.change(dateInput, { target: { value: courseDate } });
    expect(dateInput).toHaveValue(courseDate);

    // Expect to See Confirmation Message after submitting form successfully
    fireEvent.submit(registerBtn);

    await waitFor(() => expect(getByRole('button', { name: /Register/i })).toBeInTheDocument());
    const successMsg = getByTestId('flashMessage');
    expect(successMsg).toBeInTheDocument();
    expect(successMsg.textContent).toBe('Reservation created successfully');
  });
});
// Reservation created successfully
