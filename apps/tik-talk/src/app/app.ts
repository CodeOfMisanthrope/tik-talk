import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExperimentalFromTvComponent } from '../../../../libs/experimental/src/lib/feature-form-tv/experimental-form-tv/experimental-from-tv.component';
import { ExperimentalFormMyComponent } from './components/experimental-form-my/experimental-form-my.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // ExperimentalComponent,
    ExperimentalFormMyComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tik-talk');
}
