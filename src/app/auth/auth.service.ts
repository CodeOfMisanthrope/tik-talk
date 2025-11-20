import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  login(payload: Partial<{ username: string, password: string }>) {
    if (!payload.username || !payload.password) {
      throw new Error('Username and password are required');
    }
    console.log(payload)
    const fd = new FormData();
    console.log(fd);
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post(
      `${this.baseApiUrl}token`,
      fd,
    );
  }
}
