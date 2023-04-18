import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  showValidationErrors: boolean;
  loginFailed: boolean;
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) this.showValidationErrors = true;
  }

  onLoginButtonClicked(username: string, password: string) {
    this.authService.login(username, password).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 400) {
        this.loginFailed = true;

        error.error.errors != null 
          ? this.errorMessage = error.error.errors[Object.keys(error.error.errors)[0]] 
          : this.errorMessage = error.error;
      }
      return throwError(() => error);

    })).subscribe((res: HttpResponse<any>) => {
      if(res.status === 200) {
        this.router.navigate(['/lists']);
      }
    })
  }

}
