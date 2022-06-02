import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://localhost:7000/profile-service/admin';
  }

  delete(id: string) {
    return this.http.get(this.url + '/BlockUser/' + id, {responseType: 'text'})
    .pipe(
      map(
        response => response
      )
    )
  }
}
