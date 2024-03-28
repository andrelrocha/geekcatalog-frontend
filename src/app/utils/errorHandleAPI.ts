import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandleAPI {
  static handleError(error: HttpErrorResponse): string {
    let errorMessage: string;
    if (error.status === 400) {
      errorMessage = `Erro ${error.status}: \n${error.error}`;
      alert(errorMessage);
    } else if (error.status === 401 || error.status === 403) {
      errorMessage = `Erro ${error.status}: \n${error.error}`;
    } else {
      errorMessage = `Erro ${error.status}: \n${error.error}`;
      console.log(error);
      alert(errorMessage);
    }
    console.error(errorMessage);
    return errorMessage;
  }
}
