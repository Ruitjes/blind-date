import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, tap, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-user-metadata',
  templateUrl: './user-metadata.component.html',
  styleUrls: ['./user-metadata.component.css']
})
export class UserMetadataComponent implements OnInit {
  metadata: any = {};

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }


  async getUser() {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://blind-date.eu.auth0.com/api/v2/users/${user?.sub}`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
  }
}
