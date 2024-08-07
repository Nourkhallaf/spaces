import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { LoginComponent } from './login.component';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/AuthService.';

class MockApiService {
  login(credentials: { email: string, password: string }) {
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return of({ token: 'test-token' });
    } else {
      return throwError({ error: 'Invalid credentials' });
    }
  }
}

class MockLocalStorageService {
  private storage = new Map<string, string>();

  setAuthorization(token: string) {
    this.storage.set('auth_token', token);
  }

  getAuthorization() {
    return this.storage.get('auth_token');
  }

  removeAuthorization() {
    this.storage.delete('auth_token');
  }
}

class MockAuthService {
  loginMessage = new EventEmitter<string>();

  login(email: string, password: string) {
    if (email === 'test@example.com' && password === 'password') {
      this.loginMessage.emit('Login successful!');
    } else {
      this.loginMessage.emit('Login failed!');
    }
  }

  checkAuthorization() {
    return false;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ApiService, useClass: MockApiService },
        { provide: LocalStorageService, useClass: MockLocalStorageService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check authorization on init', () => {
    spyOn(authService, 'checkAuthorization').and.returnValue(true);
    component.ngOnInit();
    expect(authService.checkAuthorization).toHaveBeenCalled();
    expect(component.isAuthorized).toBe(true);
  });

  it('should call authService.login when login method is called', () => {
    spyOn(authService, 'login');
    component.email = 'test@example.com';
    component.password = 'password';
    component.login();
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should subscribe to loginMessage and set message', () => {
    const testMessage = 'Login successful!';
    authService.loginMessage.subscribe((message: string) => {
      component.message = message;
    });
    authService.loginMessage.emit(testMessage);
    expect(component.message).toBe(testMessage);
  });

  it('should navigate to home if authorized', () => {
    spyOn(authService, 'checkAuthorization').and.returnValue(true);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should navigate to login if not authorized', () => {
    spyOn(authService, 'checkAuthorization').and.returnValue(false);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should set login message on successful login', () => {
    spyOn(authService.loginMessage, 'emit');
    component.email = 'test@example.com';
    component.password = 'password';
    component.login();
    expect(authService.loginMessage.emit).toHaveBeenCalledWith('Login successful!');
  });

  it('should set login message on failed login', () => {
    spyOn(authService.loginMessage, 'emit');
    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.login();
    expect(authService.loginMessage.emit).toHaveBeenCalledWith('Login failed!');
  });
});
