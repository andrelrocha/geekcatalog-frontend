import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUserByid } from './useCase/getUserById';
import { UserReturn } from '../DTO/userReturnDTO';
import { environment } from '../../../../environments/environment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-get-user-byid',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './get-user-byid.component.html',
  styleUrl: './get-user-byid.component.scss',
  providers: [ GetUserByid ]
})
export class GetUserByidComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  userSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private getUser: GetUserByid) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      nome: [''],
      cpf: [''],
      login: ['']
    });


    this.userSubscription = this.getUser.getUserById().subscribe({
      next: (user: UserReturn | void) => {
        if (!user) {
          console.error('Usuário não encontrado');
          window.location.href = environment.appUrl;
          return;
        }

        this.userForm.patchValue({
          id: user.id,
          nome: user.nome,
          cpf: user.cpf,
          login: user.login
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
