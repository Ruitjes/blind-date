import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

const ELEMENT_DATA: Question[] = [
  { id: 1, question: 'Is this dress pretty?', answers: [new Answer(0, 'no'), new Answer(1, 'yes')] },
  { id: 2, question: 'What blind restaurants are there?', answers: [new Answer(0, 'Dont know'), new Answer(1, 'yes in amsterdam maybe')] },
  { id: 3, question: 'Straight or curly hair for a first date?', answers: [new Answer(0, 'Curly!!'), new Answer(1, 'girll curly for sureee')] },
];

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'question', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAnswers(question: Question): void {
    console.log(question);
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      maxWidth: '50%',
      data: { Question: question }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
      });
  }
}
