import { Component } from '@angular/core';
import { LocalStorageService } from './service/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-lists';
  isAuthurized: boolean = false;

  constructor(private localStorageService: LocalStorageService, private router:Router){
    if (localStorageService.getAuthorization()) {
      console.log("User is authenticated")
      router.navigate(['']);
      this.isAuthurized = true;
    } else {
      console.log("User is not authenticated")
      router.navigate(['login']);
      this.isAuthurized = false;
    }
  }
  logout() {

    this.localStorageService.removeAuthorization();
    this.router.navigate(['']);
  }
}
