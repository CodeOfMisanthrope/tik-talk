import {Component, input} from '@angular/core';
import {Post} from '../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-post',
  imports: [
    DatePipe,
    AvatarCircleComponent,
    SvgIconComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>();
}
