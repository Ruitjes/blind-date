import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Status } from '../models/Status';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends DataService {
  constructor(http: HttpClient) {
    super('https://localhost:7000/report-service/reports', http);
  }

  handleReport(id: string, newStatus: Status) {
    return this.http.patch("https://localhost:7000/report-service/reports/" + id, JSON.stringify(newStatus))
      .pipe(
        map(
          response => response
        )
      )
  }
}
