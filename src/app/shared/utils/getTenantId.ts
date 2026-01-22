export function getTenantId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const tenantId = sessionStorage.getItem('tenantId');

  return tenantId ? tenantId : '';
}
