import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../utils/formUtils';
import { CreateUser } from './useCase/createUser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [CreateUser, FormUtils]
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private createUser: CreateUser) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]],
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d).*$')]]
    });
  }

  onSubmit() {
    this.createUser.onSubmit(this.userForm);
  }

  cancel() {
    FormUtils.cancel(this.userForm);
  }
}
