// environment.ts
const url = 'http://dev.localhost';
const port = '8081';
const apiPath = 'api/v1';

export const environment = {
  production: false,
  url,
  port,
  apiUrl: `${url}:${port}/${apiPath}`,
};
