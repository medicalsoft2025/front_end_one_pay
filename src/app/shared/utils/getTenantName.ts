export function getTenantName(): string {
  const host = window.location.hostname;

  // dev.localhost, tenant.localhost
  if (host.endsWith('.localhost')) {
    return host.split('.')[0];
  }

  // localhost puro
  if (host === 'localhost') {
    return 'default';
  }

  // Producción: tenant.midominio.com
  const parts = host.split('.');
  if (parts.length > 2) {
    return parts[0];
  }

  return 'default';
}
