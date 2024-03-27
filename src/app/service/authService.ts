import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  setAuthToken(token: string): void {
    this.cookieService.set('auth', token);
  }

  getAuthToken(): string | undefined {
    return this.cookieService.get('auth');
  }

  deleteAuthToken(): void {
    this.cookieService.delete('auth');
  }
}
