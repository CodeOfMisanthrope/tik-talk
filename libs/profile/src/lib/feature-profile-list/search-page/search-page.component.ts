import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileCard } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {profileActions, selectFilteredProfiles} from '../../data';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFiltersComponent, InfiniteScrollTriggerComponent],
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
}
