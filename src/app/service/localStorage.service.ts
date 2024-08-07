import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private readonly authorized = 'authorized';
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

  removeAuthorization() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.authorized);
  }

  clear() {
    localStorage.clear();
  }
}
