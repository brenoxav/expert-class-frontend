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

  xtest('Has a submit button for the form', async () => {
    const { getByRole } = renderedComponent;

    await waitFor(() => expect(getByRole('button', { name: /Register/i })).toBeInTheDocument());
  });

  xtest('Get confirmation message when successfully registering for a class', async () => {
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
    const successMsg = await waitFor(() => getByTestId('flashMessage'));
    expect(successMsg).toBeInTheDocument();
    expect(successMsg.textContent).toBe('Reservation created successfully');
  });

  xtest('See validation message when there\'s an empty field in the form', async () => {
    const {
      getByText, getByRole, getByTestId,
    } = renderedComponent;

    let registerBtn;

    // Expect Register Button
    await waitFor(() => {
      registerBtn = getByRole('button', { name: /Register/i });
    });

    expect(registerBtn).toBeInTheDocument();

    // Leave Courses selection empty

    expect(getByText('Choose a Course')).toBeInTheDocument();

    // Expect to See Cities dropdown button
    const chooseCityDd = getByText('Choose a City');
    expect(chooseCityDd).toBeInTheDocument();
    fireEvent.click(chooseCityDd);
    const citySelection = getByText('New York, USA');
    fireEvent.click(citySelection);
    expect(getByText('New York, USA')).toBeInTheDocument();

    // Expect to See Date input
    const dateInput = getByTestId('datePicker');
    expect(dateInput).toBeInTheDocument();
    let courseDate = new Date(Date.now() + (3600 * 1000 * 24) * 6);
    courseDate = courseDate.toISOString().substr(0, 10);
    fireEvent.change(dateInput, { target: { value: courseDate } });
    expect(dateInput).toHaveValue(courseDate);

    // Expect to See Validation Message
    fireEvent.submit(registerBtn);
    const validationMessage = getByTestId('formValidation');
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage.textContent).toBe('Please select a course.');
  });

  xtest('Date input default value is the next day from current day', async () => {
    const {
      getByRole, getByTestId,
    } = renderedComponent;

    let registerBtn;

    await waitFor(() => {
      registerBtn = getByRole('button', { name: /Register/i });
    });

    expect(registerBtn).toBeInTheDocument();

    const dateInput = getByTestId('datePicker');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput.value)
      .toBe(new Date(Date.now() + (3600 * 1000 * 24)).toISOString().substr(0, 10));
  });

  xtest('If a date is set to today or any day in the past, a validation message appears', async () => {
    const {
      getByRole, getByTestId, getByText,
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

    // Expect to See Cities dropdown button
    const chooseCityDd = getByText('Choose a City');
    expect(chooseCityDd).toBeInTheDocument();
    fireEvent.click(chooseCityDd);
    const citySelection = getByText('New York, USA');
    fireEvent.click(citySelection);
    expect(getByText('New York, USA')).toBeInTheDocument();

    // Select today as the date
    const dateInput = getByTestId('datePicker');
    expect(dateInput).toBeInTheDocument();
    let courseDate = new Date(Date.now());
    courseDate = courseDate.toISOString().substr(0, 10);
    fireEvent.change(dateInput, { target: { value: courseDate } });
    expect(dateInput).toHaveValue(courseDate);

    // Expect to See Validation Message for Date
    fireEvent.submit(registerBtn);
    const validationMessage = getByTestId('formValidation');
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage.textContent).toBe('Please select a valid date.');

    // Select two days before today as the date
    courseDate = new Date(Date.now() - (3600 * 1000 * 24) * 2);
    courseDate = courseDate.toISOString().substr(0, 10);
    fireEvent.change(dateInput, { target: { value: courseDate } });
    expect(dateInput).toHaveValue(courseDate);

    // Expect to See Validation Message for Date
    fireEvent.submit(registerBtn);
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage.textContent).toBe('Please select a valid date.');
  });
});

// params.require(:course).permit(:title, :description, :instructor, :duration, :image)
