import {Component, inject} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../data/services/profile.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,
    NgIf
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
 profileService = inject(ProfileService);
 profile = inject(ProfileService).me;
}
