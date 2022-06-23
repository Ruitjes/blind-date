import { Component, OnInit } from '@angular/core';
import { Report } from '../models/Report';
import { ReportsService } from '../services/reports.service';
import { Status } from '../models/Status';
import { UsersService } from '../services/users.service';
import { QuestionsService } from '../services/questions.service';
import { AnswersService } from '../services/answers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Question', 'Content', 'Reporter', 'Reported', 'Created at', 'Status', 'New Status', 'Delete'];
  reports: Report[] = [];
  statusArray = Object.values(Status);

  constructor(private reportsService: ReportsService,
    private usersService: UsersService,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  // Get reports
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

        this.openSnackBar('User was deleted successfully', 'Ok');
      })
  }

  // Delete content
  deleteContent(report: Report) {
    if (report.question.id == report.reportedContent.id) {
      this.deleteQuestion(report);
    }
    else {
      this.deleteAnswer(report);
    }
  }

  // Delete question
  deleteQuestion(report: Report) {
    this.questionsService.deleteQuestion(report.reportedContent.id)
      .subscribe(() => {
        this.handleReport(report, Status.Resolved);

        this.openSnackBar('Question was deleted successfully', 'Ok');
      })
  }

  // Delete answer
  deleteAnswer(report: Report) {
    this.answersService.deleteAnswer(report.reportedContent.id)
      .subscribe(() => {
        this.handleReport(report, Status.Resolved);

        this.openSnackBar('Answer was deleted successfully', 'Ok');
      })
  }

  // Update status
  // called when a user is deleted, a question or and answer is deleted or when the admin changes the status manaually
  handleReport(report: Report, newStatus: Status) {
    this.reportsService.handleReport(report.id, newStatus)
      .subscribe(() => {
        // update report in array
        var index = this.reports.findIndex(r => r.id == report.id);
        report.status = newStatus;
        this.reports.splice(index, 1, report);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
