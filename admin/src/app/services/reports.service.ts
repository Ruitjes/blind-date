import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/Status';
import { CustomAuthService } from './custom-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url: string;

  constructor(private http: HttpClient, private auth: CustomAuthService) {
    this.url = environment.apiUrlReports;
  }

  async getAllReports() {
    const accessToken = await this.auth.getToken();

    return this.http.get(this.url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
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
