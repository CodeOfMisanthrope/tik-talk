import {inject, Injectable, signal} from '@angular/core';
import {Profile} from '../interfaces/profile.interface';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../interfaces/pageable.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  // getAccount(id: string) {
  //   return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  // }

  getSubscribersShortList() {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map((response) => response.items.slice(0, 3))
      );
  }
}
