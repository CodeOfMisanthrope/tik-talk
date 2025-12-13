import { Component, inject, input, OnInit, signal } from '@angular/core';
// import { PostComment, Post } from '../../../data/interfaces/post.interface';
// import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
// import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import {AvatarCircleComponent, SvgIconComponent} from '@tt/common-ui';
// import { PostInputComponent } from '../../ui/post-input/post-input.component';
// import { CommentComponent } from '../../ui/comment/comment.component';
// import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';
// import { TimeAgoPipe } from '../../../helpers/pipes/time-ago.pipe';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {CommentComponent, PostInputComponent} from '../../ui';
import {Post, PostComment, PostService} from '../../data';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    TimeAgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostService);

  async onCreated(event: { postText: string }) {
    await this.createPost(event.postText);

    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id));
    this.comments.set(comments);
  }

  createPost(content: string) {
    return firstValueFrom(
      this.postService.createComment({
        text: content,
        authorId: this.post()!.author!.id,
        postId: this.post()!.id,
      })
    );
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }
}
