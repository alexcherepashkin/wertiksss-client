import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  returnUrl: string;
  isLoggedIn = false;
  isLoginFailed = false;
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    if (this.authService.jwtUserValue) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit() {
    this.loading = true;

    this.authService.login(this.form)
      .subscribe({
        next: (_) => {
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.redirectTo();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message ? err.error.message : '';
          // this.parseIfFieldErrors(err.error);
          this.isLoginFailed = true;
          this.loading = false;
        }
      });
  }

  private redirectTo() {
    window.location.assign(this.returnUrl);
    // this.router.navigate([this.returnUrl]);
  }
}
