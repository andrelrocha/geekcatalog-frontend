import { Injectable } from "@angular/core";
import { UserReturn } from "../userReturnDTO";

@Injectable()
export class MapResponseToDTO {
  static mapResponseToUserReturn(response: any): UserReturn {
    const userReturn: UserReturn = {
      id: response.id,
      nome: response.name,
      login: response.login,
      cpf: response.cpf
    };
    return userReturn;
  }

}
