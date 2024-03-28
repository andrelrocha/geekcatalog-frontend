import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap } from "rxjs";
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

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const headers = new HttpHeaders({
      contentType: 'application/json',
      Authorization: `Bearer ${token}`
    });

    const urlId = environment.apiUrl + 'user/getuserid/' + token;

    return this.http.get(urlId, { headers }).pipe(
      switchMap((response: any) => {
        const url = environment.apiUrl + 'user/byid/' + response.id;
        return this.http.get(url, { headers }).pipe(
          map(resp => MapResponseToDTO.mapResponseToUserReturn(resp)),
          catchError(error => {
            ErrorHandleAPI.handleError(error);
            throw error;
          })
        );
      }),
      catchError(error => {
        ErrorHandleAPI.handleError(error);
        throw error;
      })
    );
  }
}
