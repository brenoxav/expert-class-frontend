import usersSlice, { signUpUser, loginUser, logoutUser } from '../../auth/sessionSlice';

const initialState = {
  user: {},
  logged_in: false,
  status: 'idle',
  error: null,
};

describe('usersReducer', () => {
  test('should return the initial state', () => {
    expect(usersSlice(undefined, {})).toEqual(initialState);
  });

  describe('signUpUser action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        status: 'created',
        logged_in: true,
        user: {
          id: 41,
          username: 'Goku',
          name: 'Kakarot',
          created_at: '2021-12-02T04:07:08.069Z',
          updated_at: '2021-12-02T04:07:08.069Z',
        },
      };

      expect(usersSlice(initialState, signUpUser.fulfilled(payload))).toEqual(
        {
          user: {
            id: 41,
            username: 'Goku',
            name: 'Kakarot',
            created_at: '2021-12-02T04:07:08.069Z',
            updated_at: '2021-12-02T04:07:08.069Z',
          },
          logged_in: true,
          status: 'fulfilled',
          error: null,
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        status: 401,
        error: 'This username already exists. Please Choose another one.',
      };

      expect(usersSlice(initialState, signUpUser.fulfilled(payload))).toEqual(
        {
          user: {},
          logged_in: false,
          status: 'fulfilled',
          error: 'This username already exists. Please Choose another one.',
        },
      );
    });
  });

  describe('loginUser action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        status: 'created',
        logged_in: true,
        user: {
          id: 1,
          username: 'john_doe',
          name: 'john',
          created_at: '2020-11-05T23:43:07.938Z',
          updated_at: '2020-11-05T23:43:07.938Z',
        },
      };

      expect(usersSlice(initialState, loginUser.fulfilled(payload))).toEqual(
        {
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
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        status: 401,
      };

      expect(usersSlice(initialState, loginUser.fulfilled(payload))).toEqual(
        {
          user: {},
          logged_in: false,
          status: 'fulfilled',
          error: 'Username does not exist. Please try again.',
        },
      );
    });
  });

  describe('logoutUser action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        logged_out: true,
      };

      expect(usersSlice(initialState, logoutUser.fulfilled(payload))).toEqual(
        {
          user: {},
          logged_in: false,
          status: 'fulfilled',
          error: null,
        },
      );
    });
  });
});
