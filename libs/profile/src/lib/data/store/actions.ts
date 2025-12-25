import {createActionGroup, props} from '@ngrx/store';
import {Profile} from '@tt/interfaces/profile';
import {ProfileFilterParams} from '../interfaces/profile-filter.interfaces';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    // 'filter events': props<{filters: Record<string, any>}>(),
    'filter events': props<{filters: ProfileFilterParams}>(),
    'set page': props<{page?: number}>(),
    'profile loaded': props<{profiles: Profile[]}>(),
  }
});
