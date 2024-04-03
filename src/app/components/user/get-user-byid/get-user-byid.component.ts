import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GetUserByid } from './useCase/getUserById';
import { UserReturn } from '../DTO/userReturnDTO';
import { environment } from '../../../../environments/environment';
import { FormUtils } from '../../../utils/formUtils';

@Component({
  selector: 'app-get-user-byid',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './get-user-byid.component.html',
  styleUrl: './get-user-byid.component.scss',
  providers: [ GetUserByid, provideNgxMask() ]
})
export class GetUserByidComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  userSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private getUser: GetUserByid) { }

  async ngOnInit() {
    this.userForm = this.fb.group({
      id: { value: '', disabled: true },
      login: { value: '', disabled: true },
      nome: { value: '', disabled: true },
      cpf: { value: '', disabled: true },
      telefone: { value: '', disabled: true },
      data_nascimento: { value: '', disabled: true }
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
          login: user.login,
          nome: user.nome,
          cpf: user.cpf,
          telefone: user.telefone,
          data_nascimento: user.data_nascimento
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleForm(enable: boolean) {
    if (enable) {
      this.userForm.enable();
      const tituloTela = document.getElementById('tituloTelaUser');
      if (tituloTela) {
        tituloTela.textContent = 'Edite suas informações';
      }
      document.getElementById('permitirEdicao')?.classList.add('hide');
      document.getElementById('salvarEdicao')?.classList.remove('hide');
      document.getElementById('cancelarEdicao')?.classList.remove('hide');
    } else {
      this.userForm.disable();
      window.location.reload();
    }
  }

  onSubmit() {

  }

  cancel() {
    FormUtils.cancel(this.userForm);
  }
}
