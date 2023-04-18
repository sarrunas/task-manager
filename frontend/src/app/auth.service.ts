import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) { }

  login(username: string, password: string) {
    return this.webService.login(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body.userId, res.body.accessToken);
      })
    )
  }

  signup(username: string, password: string, confirmpassword: string) {
    return this.webService.signup(username, password, confirmpassword).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body.userId, res.body.accessToken);
      })
    )
  }

  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
  }
}
