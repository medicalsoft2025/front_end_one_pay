export interface EnvironmentModel {
  production: boolean;
  baseUrl?: string;
  port?: number;

  api: {
    msAuth: string;
    msOnePay: string;
  };
}
