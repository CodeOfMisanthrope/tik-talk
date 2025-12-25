import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-count',
  imports: [CommonModule],
  templateUrl: './message-count.component.html',
  styleUrl: './message-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCountComponent {
  value = input.required<number>();
}
