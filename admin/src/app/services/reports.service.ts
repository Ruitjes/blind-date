import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends DataService {

  constructor(http: HttpClient) {
    super('https://localhost:7000/report-service/api/reports', http);
  }
}
