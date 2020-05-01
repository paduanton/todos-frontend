import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import * as moment from './../../../node_modules/moment/moment';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  private apiRoot = environment.apiBaseUri;

  constructor(private http: HttpClient) {}

  private setSession(authResult) {
    const access_token = authResult.access_token;
    const payload = <JWTPayload>jwtDecode(access_token);
    const expiresAt = moment.unix(payload.exp);
    
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  login(credentials: object) {
    return this.http
      .post(this.apiRoot.concat('/login'), credentials)
      .pipe(
        tap((response) => this.setSession(response)),
        shareReplay()
      );
  }

  signup(name: string, email: string, password: string, password_confirmation: string, birthday: Date) {
    return this.http
      .post(this.apiRoot.concat('/signup'), 
      {name, email, password, password_confirmation, birthday})
      .pipe(
        tap((response) => this.setSession(response)),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {

    if(!this.accessToken || !moment().isBefore(this.getExpiration())) {
      return false;
    }
    return true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer'.concat(accessToken)),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
