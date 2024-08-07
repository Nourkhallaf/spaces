import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { LocalStorageService } from '../../service/localStorage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService.';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';
  isAuthorized: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.isAuthorized = this.authService.checkAuthorization();
    if (this.isAuthorized) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['login']);
    }

    this.authService.loginMessage.subscribe(message => {
      this.message = message;
    });
  }

  login() {
    this.authService.login(this.email, this.password);
  }


}
