import http from './httpService';

const apiEndpoint = '/admins';

export function register(admin) {
  return http.post(apiEndpoint, {
    name: admin.name,
    email: admin.email,
    password: admin.password,
  });
}
