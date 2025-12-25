import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileCard } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {profileActions, ProfileService, selectFilteredProfiles} from '../../data';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';
import {WaIntersectionObservee, WaIntersectionObserverDirective} from '@ng-web-apis/intersection-observer';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {firstValueFrom, scan, Subject} from 'rxjs';
import {Profile} from '@tt/interfaces/profile';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    InfiniteScrollDirective,
    AsyncPipe,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profileService = inject(ProfileService);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console;

  // profilesSubject$ = new Subject<Profile[]>();

  // infiniteProfiles$ = this.profilesSubject$.pipe(
  //   scan((acc, curr) => {
  //     return acc.concat(curr) as Profile[];
  //   }, [] as Profile[])
  // );

  // page = 1;

  constructor() {}

  // ngOnInit() {
    // this.getNextPage();
  // }

  // async getNextPage() {
  //   this.page += 1;
  //   const res = await firstValueFrom(this.profileService.filterProfiles({ page: this.page }));
  //   this.profilesSubject$.next(res.items);
  // }

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  // onScroll() {
  //   console.log('scroll');
  //   this.getNextPage();
  //   // this.timeToFetch();
  // }

  // onIntersection(entries: IntersectionObserverEntry[]) {
  //   if (!entries.length) return;
  //
  //   if (entries[0].intersectionRatio > 0) {
  //     this.timeToFetch();
  //   }
  // }
}
