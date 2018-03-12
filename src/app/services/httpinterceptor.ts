import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}