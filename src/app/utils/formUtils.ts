import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class FormUtils {
  static cancel(form: FormGroup): void {
    form.reset();
    alert('Operação cancelada!');
  }

  static logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl != null && abstractControl.invalid) {
        console.log('Campo inválido:', key);
        console.log('Erros:', abstractControl.errors);

        if (abstractControl?.errors?.['required']) {
          alert(`O campo ${key} é obrigatório.`);
        }

        if (abstractControl.errors?.['email'] || abstractControl.errors?.['login']) {
          alert('Por favor, insira um endereço de e-mail válido.');
        }

        const erroTamanho = abstractControl.errors?.['minlength'];
        const erroPadrao = abstractControl.errors?.['pattern'];

        if (erroTamanho || erroPadrao) {
          console.log('Erro de tamanho ou padrão:', erroTamanho || erroPadrao);
          if (erroPadrao['requiredPattern'] === '^(?=.*[A-Z])(?=.*\\d).*$') {
            alert('A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula e um número.');
          } else if (erroPadrao['requiredPattern'] === '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$') {
            alert('O CPF deve seguir o formato 999.999.999-99.');
          }

          if (erroTamanho) {
            alert(`O campo ${key} deve ter pelo menos ${erroTamanho.requiredLength} caracteres.`);
          }
        }
        }
    });
  }
}
