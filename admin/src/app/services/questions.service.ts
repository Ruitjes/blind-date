import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://localhost:7000/question-service/question';
  }

  delete(id: string) {
    return this.http.delete(this.url + '/DeleteQuestion/' + id)
    .pipe(
      map(
        response => response
      )
    )
  }
}
