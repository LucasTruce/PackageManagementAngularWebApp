import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {log} from 'util';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('login') && sessionStorage.getItem('token')) {
      req = req.clone({
          setHeaders: {
              Authentication: sessionStorage.getItem('token')
        }
      });
    }
    console.log( 'TOKEN!!: ' + sessionStorage.getItem('token'));

    return next.handle(req);

  }
}
