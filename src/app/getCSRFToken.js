const getCSRFToken = () => unescape(document.cookie.split('=')[1]);

export default getCSRFToken;
