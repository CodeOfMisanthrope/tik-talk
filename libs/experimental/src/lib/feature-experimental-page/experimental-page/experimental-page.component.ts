import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'lib-experimental-page',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './experimental-page.component.html',
  styleUrl: './experimental-page.component.scss',
})
export class ExperimentalPageComponent {}
