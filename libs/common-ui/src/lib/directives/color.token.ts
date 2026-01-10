import { InjectionToken } from '@angular/core';
import { PostService } from '@tt/posts';

export const COLOR = new InjectionToken<string>('It is border color', {
  providedIn: 'root',
  factory: () => 'blue'
});

export const TIMELINE_SERVICE = new InjectionToken<PostService>('TIMELINE_SERVICE');
