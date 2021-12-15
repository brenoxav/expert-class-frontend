import classDetailsReducer, { fetchClassDetails } from '../../pages/classDetailsPage/classDetailsPageSlice';

const initialState = {
  classObj: {},
  status: 'idle',
  error: null,
};

describe('classDetailsReducer', () => {
  test('should return the initial state', () => {
    expect(classDetailsReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchClassDetails action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        id: 19,
        title: 'English Composition',
        description: 'Learn how to draft professional essays',
        instructor: 'Jeremy Campbell',
        duration: 4,
        created_at: '2021-11-11T04:20:38.165Z',
        updated_at: '2021-11-11T04:20:38.181Z',
        course_image_url: 'https://res.cloudinary.com/hhh6cnm2e/image/upload/11ijaidwrn9s7s5gogab9j6wsmnz.jpeg',
      };

      expect(classDetailsReducer(initialState, fetchClassDetails.fulfilled(payload))).toEqual(
        {
          classObj: payload,
          status: 'fulfilled',
          error: null,
        },
      );
    });
  });
});
