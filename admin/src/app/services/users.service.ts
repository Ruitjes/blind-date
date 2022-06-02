import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlUsers;
  }

  blockUser(id: string) {
    return this.http.get(this.url + '/admin/BlockUser/' + id, {responseType: 'text'})
    .pipe(
      map(
        response => response
      )
    )
  }
}
