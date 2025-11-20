import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.interface';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: Partial<{ username: string, password: string }>) {
    if (!payload.username || !payload.password) {
      throw new Error('Username and password are required');
    }
    console.log(payload)
    const fd = new FormData();
    console.log(fd);
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd,
    ).pipe(
      tap((val) => this.saveTokens(val))
    );
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
