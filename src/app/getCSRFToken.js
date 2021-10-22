export const isCSRFToken = () => (!!(document.cookie));

const getCSRFToken = () => unescape(document.cookie.split('=')[1]);

export default getCSRFToken;
