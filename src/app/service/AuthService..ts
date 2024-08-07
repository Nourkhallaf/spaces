import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from './localStorage.service';
import { Router } from '@angular/router';
import { IAuthService } from './IAuthService.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  loginMessage = new EventEmitter<string>();
  private authStatus = new BehaviorSubject<boolean>(this.checkAuthorization());
  authStatus$ = this.authStatus.asObservable();

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  login(email: string, password: string): void {
    const credentials = { email, password };
    this.apiService.login(credentials).subscribe(
      (response: any) => {
        this.localStorageService.setAuthorization(response.token);
        this.authStatus.next(true);
        this.router.navigate(['/users']);
        this.loginMessage.emit('Login successful!');
      },
      (error: any) => {
        console.error('Login failed!', error);
        this.loginMessage.emit('Login failed!');
      }
    );
  }

  checkAuthorization(): boolean {
    return !!this.localStorageService.getAuthorization();
  }

  logout(): void {
    this.localStorageService.removeAuthorization();
    this.authStatus.next(false);
    this.router.navigate(['login']);
  }
}
