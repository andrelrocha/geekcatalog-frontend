import { Component } from '@angular/core';
import { LogOut } from './useCase/logout';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
  providers: [ LogOut ]
})
export class AppHeaderComponent {
  constructor(private logout: LogOut) {}

  onLogout() {
    this.logout.logout();
  }
}
