import reservationsReducer, { fetchReservations, reserveCourse } from '../../pages/reservationsPage/reservationsPageSlice';

const initialState = {
  reservations: [],
  status: 'idle',
  error: null,
};

describe('reservationsReducer', () => {
  test('should return the initial state', () => {
    expect(reservationsReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchReservations action', () => {
    test('should handle payload from successful request', () => {
      const payload = [
        {
          user: 'john',
          course: 'Singing',
          city: 'New York, USA',
          date: '2021-11-13',
          id: 36,
          created_at: '2021-11-11T14:21:26.409Z',
          updated_at: '2021-11-11T14:21:26.409Z',
        },
        {
          user: 'john',
          course: 'Yoga',
          city: 'New York, USA',
          date: '2021-11-14',
          id: 37,
          created_at: '2021-11-12T16:04:34.791Z',
          updated_at: '2021-11-12T16:04:34.791Z',
        },
        {
          user: 'john',
          course: 'Photography',
          city: 'Abuja, Nigeria',
          date: '2021-11-20',
          id: 41,
          created_at: '2021-11-14T21:31:05.624Z',
          updated_at: '2021-11-14T21:31:05.624Z',
        },
      ];

      expect(reservationsReducer(initialState, fetchReservations.fulfilled(payload))).toEqual(
        {
          reservations: payload,
          status: 'fulfilled',
          error: null,
        }
      );
    });
  });

  describe('ReserveCourse action', () => {
    const previousState = {
      reservations: [
        {
          user: 'john',
          course: 'Singing',
          city: 'New York, USA',
          date: '2021-11-13',
          id: 36,
          created_at: '2021-11-11T14:21:26.409Z',
          updated_at: '2021-11-11T14:21:26.409Z',
        },
        {
          user: 'john',
          course: 'Yoga',
          city: 'New York, USA',
          date: '2021-11-14',
          id: 37,
          created_at: '2021-11-12T16:04:34.791Z',
          updated_at: '2021-11-12T16:04:34.791Z',
        },
        {
          user: 'john',
          course: 'Photography',
          city: 'Abuja, Nigeria',
          date: '2021-11-20',
          id: 41,
          created_at: '2021-11-14T21:31:05.624Z',
          updated_at: '2021-11-14T21:31:05.624Z',
        },
      ],
      status: 'fulfilled',
      error: null,
    };

    test('should handle payload from successful request', () => {
      const payload = {
        reservation: {
          user: 'john',
          course: 'English Composition',
          city: 'New York, USA',
          date: '2021-11-14',
          id: 47,
          created_at: '2021-11-12T16:04:34.791Z',
          updated_at: '2021-11-12T16:04:34.791Z',
        },
        message: 'Reservation created successfully',
        status: 200,
      };

      expect(reservationsReducer(previousState, reserveCourse.fulfilled(payload))).toEqual(
        {
          status: 'fulfilled',
          reservations: [...previousState.reservations, payload.reservation],
          error: null,
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Create reservation failed',
        status: 400
      };

      expect(reservationsReducer(previousState, reserveCourse.fulfilled(payload))).toEqual(
        {
          reservations: previousState.reservations,
          status: 'fulfilled',
          error: payload.message,
        },
      );
    });
  });
});
