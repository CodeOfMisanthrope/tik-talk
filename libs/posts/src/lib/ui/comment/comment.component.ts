import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PostComment } from '@tt/data-access';
import { AvatarCircleComponent } from '@tt/common-ui';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input<PostComment>();
}
