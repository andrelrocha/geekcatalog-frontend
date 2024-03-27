import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandleAPI {
  static handleError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      alert(`Erro ${error.status}: \n${error.error}`);
    } else if (error.status === 401 || error.status === 403) {
      alert(`Erro ${error.status}: \n${error.error} \nFaça o login novamente`);
    } else {
      alert('Erro ao logar usuário. Por favor, tente novamente.');
    }
  }
}
