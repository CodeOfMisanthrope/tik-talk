import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl("", {
      validators: Validators.required,
      nonNullable: true
    }),
    password: new FormControl("", {
      validators: Validators.required,
      nonNullable: true
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const val = this.form.value;
      this.authService.login(val).subscribe((res) => {
        this.router.navigate(["/"]);
        console.log(res)
      })
    }
  }
}
