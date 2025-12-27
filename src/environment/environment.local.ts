// environment.ts
const url = 'http://localhost';
const port = '8081';
const apiPath = 'api/v1/one-pay';

export const environment = {
  production: false,
  url,
  port,
  apiUrl: `${url}:${port}/${apiPath}`,
};
