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
    
  },
  login: {
    root: '/one-pay/auth/login',
    twofaSetup: '/one-pay/auth/2fa/setup',
    twofaVerify: '/one-pay/auth/2fa/confirm',
    me: '/one-pay/auth/me',
  },
  users: {
    root: '/one-pay/users',
    byId: (id: string) => `/one-pay/users/${id}`,
    create: '/one-pay/users',
    byTenant: (tenantId: string) => `/one-pay/users/tenant/${tenantId}`,
    update: (id: string) => `/one-pay/users/${id}`,
    delete: (id: string) => `/one-pay/users/${id}`,
  },
  roles: {
    root: '/one-pay/roles',
    byId: (id: string) => `/one-pay/roles/${id}`,
    create: '/one-pay/roles',
    update: (id: string) => `/one-pay/roles/${id}`,
    delete: (id: string) => `/one-pay/roles/${id}`,
    byTenant: (tenantId: string) => `/one-pay/roles/tenant/${tenantId}`,
    permissions: '/one-pay/roles/permissions',
  }
};
