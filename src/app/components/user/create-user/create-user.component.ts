import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormUtils } from '../../../utils/formUtils';
import { CreateUser } from './useCase/createUser';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPhoneMaskBrModule } from 'ngx-phone-mask-br';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [CreateUser, FormUtils, provideNgxMask(), NgxPhoneMaskBrModule]
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private createUser: CreateUser) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]],
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d).*$')]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\)\d{4,5}-\d{4}$/)]],
      data_nascimento: ['', [Validators.pattern('^\\d{2}/\\d{2}/\\d{4}$')]]
    });
  }

  trimWhiteSpaceFromBirthday() {
    const oldValue = this.userForm.controls['telefone'].value;
  console.log("'"+oldValue+"'");
    const newValue = oldValue.trim();
    console.log("'"+newValue+"'");
    this.userForm.controls['telefone'].setValue(newValue);
  }

  onSubmit() {
    this.createUser.onSubmit(this.userForm);
  }

  cancel() {
    FormUtils.cancel(this.userForm);
  }
}
