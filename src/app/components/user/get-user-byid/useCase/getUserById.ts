import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../../service/authService";
import { ErrorHandleAPI } from "../../../../utils/errorHandleAPI";
import { UserReturn } from "../../DTO/userReturnDTO";
import { MapResponseToDTO } from "../../DTO/utils/mapResponseToDTO";

@Injectable()
export class GetUserByid {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserById(): Observable<UserReturn> {
    const token = this.authService.getAuthToken();

    if (token === null || token === undefined) {
      console.error("Token não encontrado");
      throw new Error("Token não encontrado");
    } else if (token.trim() === '') {
      console.error("Token retornou uma string vazia");
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = environment.apiUrl + 'user/bytokenjwt';

    return this.http.get(url, { headers }).pipe(
      map(resp => MapResponseToDTO.mapResponseToUserReturn(resp)),
      catchError(error => {
        ErrorHandleAPI.handleError(error);
        throw error;
      })
    );
  }
}
