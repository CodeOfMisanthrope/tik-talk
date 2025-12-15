import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, startWith, Subscription } from 'rxjs';
import {profileActions, ProfileService, selectedProfileFilterParams} from '../../data';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  store = inject(Store);
  filterParams = this.store.selectSignal(selectedProfileFilterParams);

  ngOnInit(): void {
    console.log('ngOnInit: ', this.filterParams());
  }

  searchForm = this.fb.group({
    // @ts-ignore
    firstName: [this.filterParams().firstName],
    // @ts-ignore
    lastName: [this.filterParams().lastName],
    // @ts-ignore
    stack: [this.filterParams().stack],
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300)
      )
      // todo почему formValue пустой
      .subscribe((formValue) => {
        console.log('-------');
        console.log('select: ', this.store.selectSignal(selectedProfileFilterParams)());
        // console.log(formValue, this.searchForm.value);
        const searchFormValue = this.searchForm.value;
        // if (formValue) {
          const filters = {
            firstName: 'firstName' in searchFormValue && typeof searchFormValue['firstName'] === 'string' ? searchFormValue.firstName : '',
            lastName: 'lastName' in searchFormValue && typeof searchFormValue['lastName'] === 'string' ? searchFormValue.lastName : '',
            stack: 'stack' in searchFormValue && typeof searchFormValue['stack'] === 'string' ? searchFormValue.stack : ''
          };
          console.log(filters);
          this.store.dispatch(profileActions.filterEvents({filters}));
          // console.log('select: ', this.store.selectSignal(selectedProfileFilterParams)());
        // } else {
        //   this.store.dispatch(profileActions.filterEvents({ filters: formValue }));
        // }
      });
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
