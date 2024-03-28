import { Routes } from '@angular/router';
import { LoginUserComponent } from './components/user/login-user/login-user.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { GetUserByidComponent } from './components/user/get-user-byid/get-user-byid.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginUserComponent },
  { path: "signin", component: CreateUserComponent },
  { path: "user", component: GetUserByidComponent }
];
