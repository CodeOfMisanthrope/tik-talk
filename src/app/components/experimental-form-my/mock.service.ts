import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Features {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MockService {
  getCharacters() {
    return of([
      {name: "Jotaro Kujo", depth: 7, history: 3},
      {name: "Joseph Joestar", depth: 7, history: 7},
      {name: "Josuke Higashikata", depth: 6, history: 6},
    ]);
  }

  getFeatures(): Observable<Features[]> {
    return of([
      // {
      //   name: "consent-processing-personal-data",
      //   label:"Согласие на обработку персональных данных",
      //   value: true
      // },
      {
        code: "worth-time",
        label: "Стоит ли аниме потраченного времени?",
        value: true
      },
      {
        code: "recommendation-friends",
        label: "Порекомендовали ли вы бы это аниме своим друзьям?",
        value: true
      },
    ]);
  }
}
