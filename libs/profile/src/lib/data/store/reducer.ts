import {Profile} from '@tt/interfaces/profile';
import {createFeature, createReducer, on} from '@ngrx/store';
import {profileActions} from './actions';
import {ProfileFilterParams} from '../interfaces/profile-filter.interfaces';

export interface ProfileState {
  profiles: Profile[];
  // profileFilters: Record<string, any>;
  profileFilters: ProfileFilterParams;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {
    firstName: '',
    lastName: '',
    stack: ''
  }
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,

    on(profileActions.profileLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles
      };
    }),

    on(profileActions.filterEvents, (state, payload) => {
      return {
        ...state,
        profileFilters: payload.filters,
      };
    })
  )
});
