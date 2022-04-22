import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>Name: {{ user.name }}</li>
      <li>E-mail: {{ user.email }}</li>
      <li>UserId: {{ user.sub }}</li>

    </ul>`
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}