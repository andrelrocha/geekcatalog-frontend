import { Injectable } from "@angular/core";
import { UserReturn } from "../userReturnDTO";

@Injectable()
export class MapResponseToDTO {
  static mapResponseToUserReturn(response: any): UserReturn {
    const dateParts = response.birthday.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const userReturn: UserReturn = {
      id: response.id,
      login: response.login,
      nome: response.name,
      cpf: response.cpf,
      telefone: response.phone,
      data_nascimento: formattedDate
    };
    return userReturn;
  }

}
