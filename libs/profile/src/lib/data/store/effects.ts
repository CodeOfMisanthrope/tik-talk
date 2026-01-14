import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { profileActions } from './actions';
import { selectedProfileFilterParams, selectProfilePageable } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectedProfileFilterParams),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters,
        });
      }),
      map((res) => profileActions.profileLoaded({ profiles: res.items }))
    );
  });
}
