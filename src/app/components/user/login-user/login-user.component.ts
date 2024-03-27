import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUser } from './useCase/loginUser';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers: [LoginUser]
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private loginUser: LoginUser) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  performLogin(): void {
    this.loginUser.performLogin(this.loginForm);
  }
}
