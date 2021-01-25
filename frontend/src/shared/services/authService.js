import jwtDecode from 'jwt-decode';

import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  sessionStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem(tokenKey, jwt);
}

export function logout() {
  sessionStorage.removeItem(tokenKey);
}

export function getCurrentAdmin() {
  try {
    const jwt = sessionStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return sessionStorage.getItem(tokenKey);
}

const methods = {
  login,
  loginWithJwt,
  logout,
  getCurrentAdmin,
  getJwt,
};

export default methods;
