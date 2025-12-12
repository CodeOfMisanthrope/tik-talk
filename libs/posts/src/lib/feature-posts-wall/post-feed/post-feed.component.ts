import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {GlobalStoreService, Throttle} from '@tt/shared';
// import {ProfileService} from '@tt/profile';
import {PostInputComponent} from '../../ui';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../data';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = inject(PostService).posts;
  profile = inject(GlobalStoreService).me;

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
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreated(event: { postText: string }) {
    // console.log("event: ", event);
    this.createPost(event.postText);
  }

  createPost(content: string) {
    firstValueFrom(
      this.postService.createPost({
        title: 'Новый пост',
        content,
        authorId: this.profile()!.id,
        communityId: 0,
      })
    );
  }
}
