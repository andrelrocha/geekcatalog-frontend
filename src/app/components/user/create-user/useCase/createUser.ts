import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../../utils/formUtils';
import { ErrorHandleAPI } from '../../../../utils/errorHandleAPI';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CreateUser {
  constructor(private http: HttpClient) {}

  onSubmit(userForm: FormGroup): void {
    if (userForm.valid) {
        const header = new HttpHeaders({
          contentType: 'application/json',
        });

        const birthday = this.convertToISODate(userForm.value.data_nascimento);

        const userData = {
          login: userForm.value.login,
          password: userForm.value.senha,
          name: userForm.value.nome,
          cpf: userForm.value.cpf,
          phone: userForm.value.telefone,
          birthday
        };

        console.log(userData);

        const url = `${environment.apiUrl}user/create`;

        this.http.post(url, userData, { headers: header })
        .subscribe({
          next: (response: any) => {
            alert(`Bem-vindo ${response.name}`);
            userForm.reset();
            window.location.href = 'http://localhost:4200/login';
          },
          error: (error: any) => {
            ErrorHandleAPI.handleError(error);
          }
        });

    } else {
      console.log('Formulário inválido!');
      FormUtils.logValidationErrors(userForm);
    }
  }

  convertToISODate(inputDate: string) {
    const parts = inputDate.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }
}
