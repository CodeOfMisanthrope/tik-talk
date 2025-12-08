import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    ReactiveFormsModule
  ],
  templateUrl: './experimental-form-my.component.html',
  styleUrl: './experimental-form-my.component.scss',
})
export class ExperimentalFormMyComponent {
  readonly AnimeName = AnimeName;

  form = new FormGroup({
    name: new FormControl<AnimeName>(AnimeName.JoJo, Validators.required),
    review: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    contacts: getContactsForm(),
    characters: new FormArray([getCharacter()]),
  });

  constructor() {
    this.form.controls.name.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.form.controls.review.reset();
      });
  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    console.log(this.form.value);
  }

  addCharacter() {
    this.form.controls.characters.push(getCharacter());
  }
}
