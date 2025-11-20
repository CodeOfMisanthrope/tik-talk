import { Component } from '@angular/core';
import {combineLatest, fromEvent, interval, map, of, zip} from 'rxjs';

@Component({
  selector: 'app-experimental',
  imports: [],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
})
export class ExperimentalComponent {
  constructor() {
    const observable$ = zip([
      interval(3000).pipe(map(i => "1_" + i)),
      interval(200).pipe(map(i => "2_" + i)),
      fromEvent(document.body, 'click')
    ]);

    observable$.subscribe({
      next: val => {
        console.log("next: ", val);
      },

      error: err => {
        console.log("error: ", err);
      },

      complete: () => {
        console.log("complete");
      }
    })
  }
}
