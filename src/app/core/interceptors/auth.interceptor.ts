import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ModalService } from '../../shared/components/modals/modal.service';
import { ApiError } from '../models/apiResponse';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const modalService = inject(ModalService);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.error) {
        const apiError = error.error as ApiError;
        if (apiError.message) {
          errorMessage = apiError.message;
        }
      }

      modalService.error('Error', errorMessage);
      return throwError(() => error);
    })
  );
};