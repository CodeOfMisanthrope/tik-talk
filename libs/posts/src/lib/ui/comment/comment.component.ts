import { Component, input } from '@angular/core';
// import { PostComment } from '../../../../data/interfaces/post.interface';
import {PostComment} from '../../data';
// import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {AvatarCircleComponent} from '@tt/common-ui';
// import { TimeAgoPipe } from '../../../../helpers/pipes/time-ago.pipe';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
