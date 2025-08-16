import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    alert('error interceptor called');
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          //auto logout honar nhitr redirect honar
          console.error('Unauthorized - maybe token expired');
        }
        return throwError(() => err);
      })
    );
  }
}
