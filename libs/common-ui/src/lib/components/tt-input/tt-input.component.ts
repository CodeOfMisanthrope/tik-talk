import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tt-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtInputComponent {
  type = input<'text' | 'password'>('text');
  placeholder = input<string>();
}
