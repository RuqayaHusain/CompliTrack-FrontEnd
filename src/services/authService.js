// src/services/authService.js

// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log(data.token)
      return JSON.parse(atob(data.token.split('.')[1]))
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1]))
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getUser = () =>  {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  } catch (err) {
    return new Error(err);
  }
};

const signout = () => {
  localStorage.removeItem('token');
};

export { 
  signUp, signIn, getUser, signout 
};

