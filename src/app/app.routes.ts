import { Routes } from '@angular/router';
import { LoginUserComponent } from './components/user/login-user/login-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginUserComponent },
];
