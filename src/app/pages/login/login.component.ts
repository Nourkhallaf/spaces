import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { LocalStorageService } from '../../service/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private apiService: ApiService,
             private localStorageService: LocalStorageService,
             private router: Router,

  ) {}

  login() {
    let credentials ={
      email: this.email,
      password: this.password
    }

      this.apiService.login(credentials).subscribe((response: any)=>{
        if(response){
          this.message = 'Login successful!';
          this.localStorageService.setAuthorization(response.token);
          sessionStorage.setItem("email", this.email);
          this.router.navigate(['/users']);
        }
      },
        (error :any) => {
          this.message = 'Login failed!';
          console.log(error);
        }
      );
    }
}
