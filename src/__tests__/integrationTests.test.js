import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReactRouter from 'react-router';
// import userEvent from '@testing-library/user-event';
import { render, cleanup, fireEvent } from '../tests/test-utils';
import App from '../App';
import ReservePage from '../pages/reservePage/reservePage';
import SignInPage from '../pages/signInPage/signInPage';
// import gniWorldReducer from '../mocks/gniReducer';

afterEach(cleanup);

// const oldWindowLocation = window.location

/* beforeAll(() => {
  delete window.location

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  )
});

beforeEach(() => {
  window.location.assign.mockReset()
});

afterAll(() => {
  // restore `window.location` to the `jsdom` `Location` object
  window.location = oldWindowLocation
}); */

describe('App', () => {
  test('Shows loading animation while waiting for API response', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
  });

  test('Renders Landing page when not signed in', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('OUR EXPERT CLASSES')).toBeInTheDocument();
    expect(await findByText('SignIn')).toBeInTheDocument();
    expect(await findByText('SignUp')).toBeInTheDocument();
  });

  /*  test('It calls assign with expected URL', () => {
    window.location.assign('https://expert-class-frontend-v2.netlify.app/#/')

    expect(window.location.assign).toHaveBeenCalledTimes(1)
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://expert-class-frontend-v2.netlify.app/#/',
    )
  }) */

  test('When user Clicks the signin button he is taken to the Signin page', async () => {
    const { findByText, getByRole, getByPlaceholderText } = render(<App />);

    const signInLink = await findByText('SignIn');
    expect(signInLink).toBeInTheDocument();

    fireEvent.click(signInLink);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByPlaceholderText('Please enter your username')).toBeInTheDocument();

    /* const { getByRole, findByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <App />
      </MemoryRouter>
    ); */

    // const { getByRole } = render(<SignInPage />);

    /* const button = await getByRole('button');
    const input = getByRole('textbox');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toHaveDisplayValue('Sign in');
    await fireEvent.change(input, { target: { value: 'john_doe' } });
    await expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();

    await fireEvent.submit(button)

    expect(await getByRole('Classes')).toBeInTheDocument(); */
  });

  test('When user signs in he is taken to Classes page by default', async () => {
    const { findByText, getByRole, getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // window.location.assign('https://expert-class-frontend-v2.netlify.app/#/');

    const signInLink = await findByText('Sign In');

    fireEvent.click(signInLink);
    const button = await getByRole('button');
    const input = await getByRole('textbox');

    fireEvent.change(input, { target: { value: 'john_doe' } });

    fireEvent.submit(button);
    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
    expect(await findByText('Classes')).toBeInTheDocument();
    expect(await findByText('English Composition')).toBeInTheDocument();
    expect(await findByText('Jeremy Campbell')).toBeInTheDocument();

    /* const { getByRole, findByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <App />
      </MemoryRouter>
    ); */

    // const { getByRole } = render(<SignInPage />);

    /* const button = await getByRole('button');
    const input = getByRole('textbox');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toHaveDisplayValue('Sign in');
    await fireEvent.change(input, { target: { value: 'john_doe' } });
    await expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();

    await fireEvent.submit(button)

    expect(await getByRole('Classes')).toBeInTheDocument(); */
  });

  test('When user signs in he is taken to Classes previosly visited page', async () => {
    // window.location.assign('https://expert-class-frontend-v2.netlify.app/#/reserve');
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue({
      pathname: '/sign-in',
      search: '',
      hash: '',
      state: {
        from:
      {
        pathname: '/reserve', state: undefined, search: '', hash: '',
      },
      },
    });

    const { findByText, getByRole, getByTestId } = render(
      <BrowserRouter>
        <App />
        <Route path="/reserve" component={ReservePage} />
      </BrowserRouter>,
    );

    // window.location.assign('https://expert-class-frontend-v2.netlify.app/#/reserve');

    const signInLink = await findByText('Sign In');

    fireEvent.click(signInLink);
    const button = await getByRole('button');
    const input = await getByRole('textbox');

    fireEvent.change(input, { target: { value: 'john_doe' } });

    fireEvent.submit(button);
    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
    expect(await findByText('Classes')).toBeInTheDocument();
    expect(await findByText('English Composition')).toBeInTheDocument();
    expect(await findByText('Jeremy Campbell')).toBeInTheDocument();

    /* const { getByRole, findByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <App />
      </MemoryRouter>
    ); */

    // const { getByRole } = render(<SignInPage />);

    /* const button = await getByRole('button');
    const input = getByRole('textbox');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toHaveDisplayValue('Sign in');
    await fireEvent.change(input, { target: { value: 'john_doe' } });
    await expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();

    await fireEvent.submit(button)

    expect(await getByRole('Classes')).toBeInTheDocument(); */
  });

  /* test('Shows correct title when in homepage', () => {
    let initialPath = {
      path: '/',
      groupId: '',
      currentCategory: {
        current: 'region',
        other: 'income',
      },
    };

    const pathX = '/';

    const setPath = (newPath) => {
      initialPath = newPath;
    };

    const updatePath = (newPath) => {
      if (pathX !== newPath) {
        setPath(newPath);
      }
    };

    const { getByTestId } = renderWithRedux(<Header
      currentPath={initialPath}
      updatePath={updatePath}
    />);
    expect(getByTestId('headerText').textContent).toBe('gni per capita in the world');
  }); */

  /* test('Shows correct title', () => {
    const setCategoryFilter = jest.fn();

    const changeCategoryFilter = () => setCategoryFilter((actualCategory) => ({
      current: actualCategory.other,
      other: actualCategory.current,
    }));

    const props = {
      currentCategory: 'region',
      otherCategory: 'income',
      changeCategoryFilter,
    };

    const { getByTestId } = renderWithRedux(<Filter
      currentCategory={props.currentCategory}
      otherCategory={props.otherCategory}
      changeCategoryFilter={props.changeCategoryFilter}
    />);

    expect(getByTestId('currentCategory').textContent).toBe('REGIONS');
  });

  test('Show group regions on first render of app', async () => {
    const { findByText } = renderWithRedux(<App />);
    expect(await findByText('North America')).toBeInTheDocument();
  });

  test('Change category title when user clicks filter button', async () => {
    const { getByTestId, findByRole } = renderWithRedux(<App />);

    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');

    userEvent.click(await findByRole('button'));
    expect(getByTestId('currentCategory').textContent).toBe('INCOME LEVELS');
    expect(getByTestId('currentCategory').textContent).not.toBe('REGIONS');
  });

  test('Should briefly show Spinner when status of state is \'starting\'', async () => {
    const { getByTestId } = renderWithRedux(<App />);

    expect(getByTestId('spinnerSpan').textContent).toBe('Loading...');
  });

  test('When user clicks a region area, the app renders the corresponding countries page', async () => {
    const { findByText } = renderWithRedux(<App />);

    expect(await findByText('South Asia')).toBeInTheDocument();
    userEvent.click(await findByText('South Asia'));
    expect(await findByText('India')).toBeInTheDocument();
    expect(await findByText('Pakistan')).toBeInTheDocument();
    const aus = screen.queryByText('Australia');
    expect(aus).not.toBeInTheDocument();
    const bhu = screen.queryByText('Bhutan');
    expect(bhu).toBeInTheDocument();
    const arrowBtn = screen.queryByText('<');
    userEvent.click(arrowBtn);
  }); */
});

/* describe('Countries page by current group', () => {
  test('When user clicks the back arrow, app goes back to homepage', async () => {
    const { findByText, getByTestId } = renderWithRedux(<App />);

    userEvent.click(await findByText('South Asia'));
    expect(await findByText('India')).toBeInTheDocument();
    const arrowBtn = screen.queryByText('<');
    userEvent.click(arrowBtn);
    expect(await findByText('North America')).toBeInTheDocument();
    expect(getByTestId('currentCategory').textContent).toBe('REGIONS');
  });
}); */
