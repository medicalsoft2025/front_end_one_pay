export const OnePayEndpoints = {
  bank: {
    root: 'https://api.onepay.la/v1/banks',
    byId: (id: string) => `/one-pay/banks/${id}`,
  }
  
};
