import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/AuthService.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-lists';
  isAuthorized: boolean = false;

  constructor(
    private authService: AuthService,
    private router:Router){}

      ngOnInit(): void {
        this.authService.authStatus$.subscribe((status: boolean) => {
          this.isAuthorized = status;
        });
        this.isAuthorized = this.authService.checkAuthorization();
        if (this.isAuthorized) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['login']);
        }
      }

      logout() {
        this.authService.logout();
      }
}
