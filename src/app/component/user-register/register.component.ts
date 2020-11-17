import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

export interface FieldError { field: string, message: string, objectName: string };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  usernameErrors: FieldError[];
  passwordErrors: FieldError[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true;

    this.authService.register(this.form).subscribe({
      next: (success: any) => {
        if (success) {
          this.successMessage = 'You have registered successfully';
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }
      },
      error: (err: any) => {
        if (err?.error) {
          this.errorMessage = err.error.validationErrors ? '' : err.error.message;
          this.parseIfFieldErrors(err.error);
        }
        this.isSignUpFailed = true;
        this.isSuccessful = false;
        this.loading = false;
      }
    });
  }

  private parseIfFieldErrors(error: any) {
    this.usernameErrors = error.validationErrors?.filter((error: FieldError) => error.field == 'username');
    this.passwordErrors = error.validationErrors?.filter((error: FieldError) => error.field == 'password');
  }
}
