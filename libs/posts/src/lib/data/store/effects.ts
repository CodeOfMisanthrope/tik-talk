import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {firstValueFrom, map, switchMap} from 'rxjs';
import {PostService} from '../services/post.service';
import {postsActions} from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  postsService = inject(PostService);
  actions$ = inject(Actions);

  loadPosts = createEffect(() => {
    console.log('called'); // выведется 1 раз
    return this.actions$.pipe(
      ofType(postsActions.postsFetch),
      switchMap(() => {
        console.log('fetchPosts'); // выведется 21 раз
        return this.postsService.fetchPosts()
      }),
      map((res) => postsActions.postsLoaded({posts: res}))
    );
  });
}
