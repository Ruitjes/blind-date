import { Component, OnInit } from '@angular/core';
import { Report } from '../models/Report';
import { ReportsService } from '../services/reports.service';
import { Status } from '../models/Status';
import { UsersService } from '../services/users.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Question', 'Content', 'Reporter id', 'Reporter name', 'Reported id', 'Reported name', 'Created at', 'Status', 'New Status', 'Delete'];
  reports: Report[] = [];
  statusArray = Object.values(Status);

  constructor(private reportsService: ReportsService,
    private usersService: UsersService,
    private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  getAllReports() {
    this.reportsService.getAllReports().subscribe(data => {
      this.reports = <Report[]>data;
    })
  }

  // Delete user
  deleteUser(report: Report, id: string) {
    this.usersService.blockUser(id)
      .subscribe(() => {
        this.handleReport(report, Status.Resolved);
      })
  }

  // Delete content (question or answer)
  deleteQuestion(report: Report, id: string) {
    this.questionsService.deleteQuestion(id)
      .subscribe(() => {
        this.handleReport(report, Status.Resolved);
      })
  }

  // Update status
  // called when a user is deleted, a question is deleted or when the admin changes the status manaually
  handleReport(report: Report, newStatus: Status) {
    this.reportsService.handleReport(report.id, newStatus)
      .subscribe(() => {
        // update report in array
        var index = this.reports.findIndex(r => r.id == report.id);
        report.status = newStatus;
        this.reports.splice(index, 1, report);
      });
  }
}
