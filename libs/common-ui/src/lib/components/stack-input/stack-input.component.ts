import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tt-stack-input',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackInputComponent {}
