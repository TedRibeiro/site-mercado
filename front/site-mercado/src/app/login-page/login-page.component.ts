import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loading = false;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

  signIn() {
    this.loading = true;
    this.errorMsg = '';

    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.signIn(userName, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        success => {
          console.log(success);
          this.router.navigateByUrl('app');
        },
        error => {
          console.log(error);
          if (error.status === 400) {
            this.errorMsg = error.error.Auth;
            return;
          }
          this.errorMsg = 'Erro ao efetuar o login. Tente novamente mais tarde';
        }
      )
    }
  }
}
