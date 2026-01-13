import {createActionGroup, emptyProps, props} from '@ngrx/store';
import { Post, PostCreateDto } from '@tt/data-access';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'posts fetch': emptyProps(),
    'posts loaded': props<{posts: Post[]}>(),
    'post create': props<{post: PostCreateDto}>(),
  }
});
