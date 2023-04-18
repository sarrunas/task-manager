import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

    showValidationErrors: boolean;
    signupFailed: boolean;
    message: string;
    errors = [];
    errorMessage: any;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
      
    }

    onFormSubmit(form: NgForm) {
      if(form.invalid) this.showValidationErrors = true;
    }

    onSignupButtonClicked(username: string, password: string, confirmpassword: string) {
      this.authService.signup(username, password, confirmpassword).pipe(catchError((error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.signupFailed = true;

          error.error.errors != null 
            ? this.errorMessage = error.error.errors[Object.keys(error.error.errors)[0]] 
            : this.errorMessage = error.error;
        }
        return throwError(() => error);

      })).subscribe((res: HttpResponse<any>) => {
        if(res.status === 200) {
          this.router.navigate(['/login']);
        }
      })
    }
}
