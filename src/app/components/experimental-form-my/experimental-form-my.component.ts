import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

enum AnimeName {
  JoJo,
  Berserk,
  One_Piece
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
}
