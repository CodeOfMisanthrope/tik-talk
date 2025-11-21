import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExperimentalComponent} from './components/experimental/experimental.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // ExperimentalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tik-talk');
}
