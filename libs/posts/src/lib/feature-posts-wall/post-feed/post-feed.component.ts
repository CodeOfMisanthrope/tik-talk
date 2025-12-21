import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalStoreService, Throttle } from '@tt/shared';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { postsActions, selectPosts } from '../../data';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeedComponent implements AfterViewInit {
  store = inject(Store);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  feed = this.store.selectSignal(selectPosts);
  profile = inject(GlobalStoreService).me;

  @Throttle(300)
  @HostListener('window:resize')
  onWindowResize() {
    // console.log("called window:resize", Date.now());
    this.resizeFeed();
  }

  constructor() {
    this.store.dispatch(postsActions.postsFetch());
    // firstValueFrom(this.postService.fetchPosts());
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
    this.createPost(event.postText);
  }

  createPost(content: string) {
    this.store.dispatch(postsActions.postCreate({
      post: {
        title: 'Новый пост',
        content,
        authorId: this.profile()!.id,
        communityId: 0,
      }
    }));
    // firstValueFrom(
    //   this.postService.createPost({
    //     title: 'Новый пост',
    //     content,
    //     authorId: this.profile()!.id,
    //     communityId: 0,
    //   })
    // );
  }
}
