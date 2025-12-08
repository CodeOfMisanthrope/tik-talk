import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExperimentalComponent} from './components/experimental/experimental.component';
import {ExperimentalFormMyComponent} from './components/experimental-form-my/experimental-form-my.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // ExperimentalComponent,
    ExperimentalFormMyComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tik-talk');
}
