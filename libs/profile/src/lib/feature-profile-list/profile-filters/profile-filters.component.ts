import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, startWith, Subscription } from 'rxjs';
import {profileActions, selectedProfileFilterParams} from '../../data';
import {ProfileFilterParams} from '../../data/interfaces/profile-filter.interfaces';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  store = inject(Store);
  filterParams = this.store.selectSignal(selectedProfileFilterParams);

  searchForm = this.fb.group<ProfileFilterParams>({

    firstName: this.filterParams().firstName,
    lastName: this.filterParams().lastName,
    stack: this.filterParams().stack,
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300)
      )
      // todo почему formValue пустой при повторном заходе на страницу
      .subscribe((formValue) => {
        this.store.dispatch(profileActions.filterEvents({filters: this.searchForm.value}));
      });
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
