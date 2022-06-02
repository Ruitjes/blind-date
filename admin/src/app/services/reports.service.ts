import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/Status';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlReports;
  }

  getAllReports() {
    return this.http.get(this.url)
      .pipe(
        map(
          response => response
        )
      )
  }

  handleReport(id: string, newStatus: Status) {
    return this.http.patch(this.url + "/" + id, JSON.stringify(newStatus))
      .pipe(
        map(
          response => response
        )
      )
  }
}
