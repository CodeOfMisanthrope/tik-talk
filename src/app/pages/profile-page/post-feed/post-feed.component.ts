import {AfterViewInit, Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {Throttle} from '../../../core/decorators/throttle';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = inject(PostService).posts;
  profile = inject(ProfileService).me;

  @Throttle(300)
  @HostListener('window:resize')
  onWindowResize() {
    // console.log("called window:resize", Date.now());
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreated(event: {postText: string}) {
    // console.log("event: ", event);
    this.createPost(event.postText);
  }

  createPost(content: string) {
    firstValueFrom(this.postService.createPost({
      title: "Новый пост",
      content,
      authorId: this.profile()!.id,
      communityId: 0,
    }));
  }
}
