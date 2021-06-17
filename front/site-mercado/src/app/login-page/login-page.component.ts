import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

  signIn() {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.signIn(userName, password)
      .pipe(first())
      .subscribe(
        success => {
          if (success) {
            this.router.navigateByUrl('app');
          } else {
            this.errorMsg = 'Usuário ou senha inválidos';
          }
        }
      )
    }
  }
}
