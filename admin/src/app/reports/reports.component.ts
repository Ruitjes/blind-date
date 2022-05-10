import { Component, OnInit } from '@angular/core';
import { Report } from '../models/Report';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Question', 'Content', 'Reporter id', 'Reporter name', 'Reported id', 'Reported name', 'Created at', 'Status'];
  reports: Report[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getAll().subscribe(data => {
      this.reports = <Report[]>data;
    })
  }
}
