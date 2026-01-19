export const Endpoints = {
  customers: {
    root: '/one-pay/customers',
    byId: (id: string) => `/one-pay/customers/${id}`,
    all: '/one-pay/customers/all',

  },
  payments: {
    root: '/one-pay/payments', 
  },
  tenants: {
    root: '/one-pay/tenants',
    byId: (id: string) => `/one-pay/tenants/${id}`,
    byName: (name: string) => `/one-pay/tenants/by-name/${name}`,
  },
  
  configTenants: {
    root: '/one-pay/config-tenants',
    byId: (id: string) => `/one-pay/config-tenants/${id}`,
    all: '/one-pay/config-tenants/all',
  },

  accounts: {
    root: '/one-pay/accounts',
    byId: (id: string) => `/one-pay/accounts/${id}`,
    all: '/one-pay/accounts/all',
    
  }
};
