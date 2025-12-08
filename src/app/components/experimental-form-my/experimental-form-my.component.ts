import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Features, MockService} from './mock.service';
import {KeyValuePipe} from '@angular/common';

enum AnimeName {
  JoJo,
  Berserk,
  One_Piece
}

function getContactsForm() {
  return new FormGroup({
    email: new FormControl<string>('', Validators.required),
    telegram: new FormControl<string>('', Validators.required),
  });
}

function getCharacter() {
  return new FormGroup({
    name: new FormControl('', Validators.required),
    depth: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)]),
    history: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)]),
  });
}

@Component({
  selector: 'app-experimental-form-my',
  imports: [
    ReactiveFormsModule,
    KeyValuePipe
  ],
  templateUrl: './experimental-form-my.component.html',
  styleUrl: './experimental-form-my.component.scss',
})
export class ExperimentalFormMyComponent {
  readonly AnimeName = AnimeName;
  mockService = inject(MockService);

  features: Features[] = [];
  form = new FormGroup({
    name: new FormControl<AnimeName>(AnimeName.JoJo, Validators.required),
    review: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    contacts: getContactsForm(),
    characters: new FormArray([getCharacter()]),
    feature: new FormRecord({})
  });

  constructor() {
    this.form.controls.name.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.form.controls.characters.clear();
        this.form.controls.review.reset();
      });

    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      })
  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    console.log(this.form.value);
  }

  addCharacter() {
    this.form.controls.characters.push(getCharacter(), {emitEvent: false});
  }

  deleteCharacter(index: number) {
    this.form.controls.characters.removeAt(index, {emitEvent: false});
  }

  sort = () => 0;
}
