import { Injectable } from "@angular/core";

import { AuthService } from "../../../service/authService";
import { environment } from "../../../../environments/environment";

@Injectable()
export class LogOut {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.deleteAuthToken();
    window.location.href = environment.appUrl + "/login";
  }
}
