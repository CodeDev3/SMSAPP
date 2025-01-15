import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { switchMap } from 'rxjs/operators';
import { GetAPIDataService } from './get-apidata.service';
import { StorageService } from './storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloned);
        }
        return next.handle(req);
      })
    );
  }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {


  //   const token = this.authService.getToken();
  //   let newHeaders = req.headers;
  //   if (token) {
  //     newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   const authReq = req.clone({ headers: newHeaders });
  //   return next.handle(authReq);
  // }
}

  

