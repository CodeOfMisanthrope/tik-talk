import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileCard } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {profileActions, selectFilteredProfiles} from '../../data';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';
import {WaIntersectionObservee, WaIntersectionObserverDirective} from '@ng-web-apis/intersection-observer';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console;

  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;

    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }
}
