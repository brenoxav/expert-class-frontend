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
      classes: [
        {
          id: 19,
          title: 'English Composition',
          description: 'Learn how to draft professional essays',
          instructor: 'Jeremy Campbell',
          duration: 4,
          created_at: '2021-11-11T04:20:38.165Z',
          updated_at: '2021-11-11T04:20:38.181Z',
          course_image_url: './images/fakeExpertPic1.jpeg',
        },
        {
          id: 21,
          title: 'Singing',
          description: 'Learn to sing',
          instructor: 'Jackie',
          duration: 5,
          created_at: '2021-11-11T14:20:44.084Z',
          updated_at: '2021-11-11T14:20:44.097Z',
          course_image_url: './images/fakeExpertPic2.jpeg',
        },
      ],
      status: 'fulfilled',
      error: null,
    };

    xtest('should handle payload from successful request', () => {
      const payload = {
        message: 'Course successfully created',
        status: 'created',
        course: {
          id: 22,
          title: 'Landscaping',
          description: 'Learn about the latest techniques and trends in this ever evolving field.',
          instructor: 'Andrés Segovia',
          duration: 5,
          created_at: new Date(Date.now()).toISOString().substr(0, 10),
          updated_at: new Date(Date.now()).toISOString().substr(0, 10),
          course_image_url: 'https://res.cloudinary.com/starsheriff/image/upload/fake_image.jpeg',
        },
      };

      expect(reservationsReducer(previousState, addClass.fulfilled(payload))).toEqual(
        {
          classes: [...previousState.classes, payload.course],
          status: 'fulfilled',
          error: null,
        },
      );
    });

    xtest('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Unable to create course',
        status: 400,
      };

      expect(reservationsReducer(previousState, addClass.fulfilled(payload))).toEqual(
        {
          classes: previousState.classes,
          status: 'fulfilled',
          error: payload.message,
        },
      );
    });
  });
});
