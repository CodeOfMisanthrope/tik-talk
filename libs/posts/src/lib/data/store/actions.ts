import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Post} from '../interfaces/post.interface';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'posts fetch': emptyProps(),
    'posts loaded': props<{posts: Post[]}>(),
  }
});
