import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {PostService} from '../services/post.service';
import {postsActions} from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  postsService = inject(PostService);
  actions$ = inject(Actions);

  loadPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postsFetch),
      switchMap(() => this.postsService.fetchPosts()),
      map((res) => postsActions.postsLoaded({posts: res}))
    );
  });

  postCreate = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postCreate),
      switchMap(({post}) => this.postsService.createPost(post)),
      map((res) => postsActions.postsLoaded({posts: res}))
    );
  });
}
