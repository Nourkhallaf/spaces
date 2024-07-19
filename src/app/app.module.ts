import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    UserDetailsComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
