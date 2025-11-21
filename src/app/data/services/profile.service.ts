import {inject, Injectable} from '@angular/core';
import {Profile} from '../interfaces/profile.interface';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../interfaces/pageable.interface';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
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
