import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../../utils/formUtils';
import { AuthService } from '../../../../service/authService';
import { ErrorHandleAPI } from '../../../../utils/errorHandleAPI';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class LoginUser {
  constructor(private http: HttpClient, private authService: AuthService) {}

  performLogin(loginForm: FormGroup): void {
    if (loginForm.valid) {
        const header = new HttpHeaders({
          contentType: 'application/json',
        });

        const userData = {
          login: loginForm.value.login,
          password: loginForm.value.senha,
        };

        const url = environment.apiUrl + 'user/login';

        this.http.post(url, userData, { headers: header })
        .subscribe({
          next: (response: any) => {
            if (!response.token) {
              alert('Erro ao logar usuário. Por favor, tente novamente.');
              return;
            }
            this.authService.setAuthToken(response.token);
            console.log(response.token);
            alert('Usuário logado com sucesso!');
            loginForm.reset();
            window.location.href = 'http://localhost:4200/user';
          },
          error: (error: any) => {
            ErrorHandleAPI.handleError(error);
          }
        });

    } else {
      console.log('Formulário inválido!');
      FormUtils.logValidationErrors(loginForm);
    }
  }
}
