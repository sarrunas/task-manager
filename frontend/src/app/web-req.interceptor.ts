import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TaskService } from './task.service';


@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private taskService: TaskService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        if(error.status === 401) {
          this.authService.logout();
        }
        if(error.status === 500) {
          this.router.navigate(['/**']);
        }
        return throwError(() => error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if(token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    return request;
  }
}
