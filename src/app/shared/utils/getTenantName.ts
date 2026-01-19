export function getTenantName(): string {
  const host = window.location.hostname; // ej: 'dev.localhost' o 'juan.miapp.com'
  const parts = host.split('.');

  // Producción: subdominio real
  if (parts.length > 2) {
    return parts[0]; // 'juan' en 'juan.miapp.com'
  }

  // Desarrollo local
  if (host === 'localhost' || host.endsWith('.localhost')) {
    // Dev puede usar 'dev.localhost' o 'tenant.localhost'
    return parts[0]; // 'dev' o 'tenant'
  }

  // Fallback seguro
  return 'default';
}
