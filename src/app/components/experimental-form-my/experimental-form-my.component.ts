import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
    name: new FormControl<AnimeName>(AnimeName.JoJo),
    review: new FormControl<string>(''),
    contacts: getContactsForm()
  });
}
