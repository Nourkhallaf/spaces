import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateUserComponent } from './pages/create-user/create-user.component'
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { AuthGuard } from './service/auth.guard';
import { NoAuthGuard } from './service/noauth.guard';

const routes: Routes = [
  // {
  //   path: ':language',
  //   component: UsersListComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: '',
  //   redirectTo: '/en/login',
  //   pathMatch: 'full'
  // },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'delete-user/:id', component: DeleteUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
