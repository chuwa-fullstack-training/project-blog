import apiCall from './api';

export const signUp = async data => {
  return await apiCall({
    url: 'http://localhost:8080/api/auth/signup',
    method: 'POST',
    data
  });
};

export const signIn = async data => {
  return await apiCall({
    url: 'http://localhost:8080/api/auth/signin',
    method: 'POST',
    data
  });
};
