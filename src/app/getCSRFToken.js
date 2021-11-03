import axios from 'axios';

export const setSessionCookies = async () => {
  try {
    await axios.get('https://expert-class-backend.herokuapp.com/', {
      withCredentials: true,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      // },
    },
    console.log('hello'));
    return true;
  } catch (error) {
    return error.message;
  }
};

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get('https://expert-class-backend.herokuapp.com/api/v1/signed_in', { withCredentials: true });
    return response.data.logged_in;
  } catch (error) {
    return error.message;
  }
};

const getCSRFToken = () => unescape(document.cookie.split('=')[1]);

export default getCSRFToken;
