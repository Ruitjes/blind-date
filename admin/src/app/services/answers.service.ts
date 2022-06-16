import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlAnswers;
  }

  deleteAnswer(id: string) {
    return this.http.put(this.url + '/deleteAnswer/' + id, null)
    .pipe(
      map(
        response => response
      )
    )
  }
}
