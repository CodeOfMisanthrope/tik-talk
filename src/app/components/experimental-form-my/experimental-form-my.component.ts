import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

enum AnimeName {
  JoJo,
  Berserk,
  One_Piece
}

function getContactsForm() {
  return new FormGroup({
    email: new FormControl<string>('')
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
  protected readonly AnimeName = AnimeName;

  form = new FormGroup({
    name: new FormControl<AnimeName>(AnimeName.JoJo, [Validators.required]),
    review: new FormControl<string>('', [
      Validators.required, Validators.minLength(3)
    ]),
    contacts: getContactsForm()
  });

  onSubmit(event: Event) {
    console.log(this.form.value);
  }
}
