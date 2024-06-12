import { HttpInterceptorFn } from '@angular/common/http';
import { getAccessToken } from '@app/functions/token-storage.function';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getAccessToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    return next(cloned);
  }

  return next(req);
};
