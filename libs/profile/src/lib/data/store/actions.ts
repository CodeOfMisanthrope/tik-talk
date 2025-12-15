import {createActionGroup, props} from '@ngrx/store';
import {Profile} from '@tt/interfaces/profile';
import {ProfileFilterParams} from '../interfaces/profile-filter.interfaces';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    // 'filter events': props<{filters: ProfileFilterParams}>(),
    'profile loaded': props<{profiles: Profile[]}>(),
    // 'filtered params change': props<{ params: ProfileFilterParams}>()
  }
});
