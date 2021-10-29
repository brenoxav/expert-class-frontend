import axios from 'axios';

export const setSessionCookies = async () => {
  try {
    await axios.get('http://localhost:3001/', { withCredentials: true });
    return true;
  } catch (error) {
    return error.message;
  }
};

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/signed_in', { withCredentials: true });
    return response.data.logged_in;
  } catch (error) {
    return error.message;
  }
};

const getCSRFToken = () => unescape(document.cookie.split('=')[1]);

export default getCSRFToken;
