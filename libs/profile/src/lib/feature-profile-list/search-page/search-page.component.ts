import { Component, inject } from '@angular/core';
import { ProfileCard } from '../../../../../../libs/profile/src/lib/ui/profile-card/profile-card.component';
// import { Profile } from '../../data/interfaces/profile.interface';
// import { ProfileService } from '../../data/services/profile.service';
import {ProfileService} from '@tt/profile';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);

  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
