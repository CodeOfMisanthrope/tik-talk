import { Component, inject } from '@angular/core';
import {Store} from '@ngrx/store';
import {ProfileCard} from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import {selectFilteredProfiles} from '../../data';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
