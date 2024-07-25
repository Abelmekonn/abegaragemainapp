// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token payload:', error);
    return {};
  }
};

// Function to read the data from the user's local storage  
const getAuth = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('employee'));

    if (user && user.token) {
      const decodedToken = decodeTokenPayload(user.token);
      console.log('Decoded Token:', decodedToken); // Log decoded token

      user.role = decodedToken.role;
      user.id = decodedToken.id;
      user.firstName = decodedToken.firstName;
      user.email = decodedToken.email;
      return user;
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error retrieving user from local storage:', error);
    return {};
  }
};


export default getAuth;
