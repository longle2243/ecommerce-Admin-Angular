import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  const cloned = req.clone({
    setHeaders: {
      Authorization: 'Bearer' + accessToken,
    },
  });

  return next(cloned)
};
