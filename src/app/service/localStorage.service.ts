import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public static UserRoleObserver$ = new EventEmitter();

  private readonly authorized = 'authorized';
  private readonly userRole = 'userrole';
  private readonly token = 'token';

  setAuthorization(token: string) {
    localStorage.setItem(this.token, token);
    localStorage.setItem(this.authorized, 'true');
  }

  getAuthorization(): string | null {
    return localStorage.getItem(this.token);
  }

  isUserAuthorized(): boolean {
    return localStorage.getItem(this.authorized) === 'true';
  }

  getUserRole(): string[] | null {
    const userRole = localStorage.getItem(this.userRole);
    return userRole ? JSON.parse(userRole) : null;
  }

  removeAuthorization() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.authorized);
  }

  setUserRole(role: string[]) {
    localStorage.setItem(this.userRole, JSON.stringify(role));
    LocalStorageService.UserRoleObserver$.emit(role);
  }

  removeUserRole() {
    localStorage.removeItem(this.userRole);
  }

  clear() {
    localStorage.clear();
  }
}
