import { EnvironmentModel } from '../app/core/models/EnvironmentModel';

export const environment: EnvironmentModel = {
  production: false,

  api: {
    msAuth: 'http://localhost:3001',
    msOnePay: 'http://localhost:8081',
  },
};
