import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Loader } from '../loader';
import { finalize, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class loaderinterceptor implements HttpInterceptor {
  constructor(private loader: Loader) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    alert('alert interceptor called');
    this.loader.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}
