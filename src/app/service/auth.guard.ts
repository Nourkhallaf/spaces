
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.localStorageService.isUserAuthorized()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
