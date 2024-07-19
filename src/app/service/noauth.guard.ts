
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.localStorageService.isUserAuthorized()) {
      this.router.navigate(['/users']);
      return false;
    } else {
      return true;
    }
  }
}
