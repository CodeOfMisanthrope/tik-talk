import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl, FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../data';
import { debounceTime, switchMap, tap } from 'rxjs';
import { FullAddressPipe } from '../../pipes/full-address.pipe';
import { DadataSuggestions } from '../../data/interfaces/dadata.interface';
import { concatAddress } from '@tt/shared';

@Component({
  selector: 'tt-address-input',
  imports: [CommonModule, TtInputComponent, ReactiveFormsModule, FullAddressPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataService);

  isDropdownOpened = signal(true);

  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    house: new FormControl(''),
  });

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((val) => {
      return this.#dadataService.getSuggestion(val).pipe(
        tap((res) => {
          this.isDropdownOpened.set(!!res.length);
        })
      );
    })
  );

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
  }

  setDisabledState?(isDisabled: boolean): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any): void {}

  onTouched() {}

  onSuggestionPick(suggest: DadataSuggestions) {
    this.isDropdownOpened.set(false);
    // this.innerSearchControl.patchValue(city, {
    //   emitEvent: false,
    // });
    // this.onChange(city);
    const { city, street, house } = suggest.data;
    const address = concatAddress(city, street, house);

    this.innerSearchControl.patchValue(address, {
      emitEvent: false,
    });
    this.onChange(address);

    this.addressForm.patchValue({
      city: city,
      street: street,
      house: house,
    });
  }
}
