import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Features } from 'luxon';

enum ReceiverType {
  ALL = 'ALL',
  ELT = 'ELT',
}

interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
  telephone?: string;
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
    telephone: new FormControl<string>(initialValue.telephone ?? '+7', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
  });
}

@Component({
  selector: 'app-experimental-form-tv',
  imports: [ReactiveFormsModule],
  templateUrl: './experimental-from-tv.component.html',
  styleUrl: './experimental-from-tv.component.scss',
})
export class ExperimentalFromTvComponent {
  ReceiverType = ReceiverType;
  // mockService = inject(MockS)
  // features: Feature[]

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.ALL, Validators.required),
    model: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    date: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    guarantee: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
  });
}
