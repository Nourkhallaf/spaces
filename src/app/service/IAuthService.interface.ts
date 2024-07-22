export interface IAuthService {
  login(email: string, password: string): void;
  checkAuthorization(): boolean;
  logout(): void;
}
