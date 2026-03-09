import { CanActivateFn } from '@angular/router';

export const redirectGuard: CanActivateFn = () => {

  const host = window.location.hostname; 
  const subdomain = host.split('.')[0]; 

  const newUrl = `https://${subdomain}.monaros.co`;
  //const newUrl = `https://${subdomain}.medicalsoft.ai`;

  window.location.href = newUrl;

  return false;
};