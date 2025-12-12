import { Component, input } from '@angular/core';
// import { Profile } from '../../data/interfaces/profile.interface';
import {Profile} from '@tt/profile';
// import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import {AvatarCircleComponent} from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
