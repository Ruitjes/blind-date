import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlQuestions;
  }

  deleteQuestion(id: string) {
    return this.http.delete(this.url + '/DeleteQuestion/' + id)
    .pipe(
      map(
        response => response
      )
    )
  }
}
