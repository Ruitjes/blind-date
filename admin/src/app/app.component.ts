import { Component } from '@angular/core';
import {Question} from './models/Question';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../src/app/popup-dialog/popup-dialog.component';
import { Answer } from './models/Answer';

const ELEMENT_DATA: Question[] = [
  {id: 1, question: 'Is this dress pretty?', answers: [new Answer(0, 'no'), new Answer(1, 'yes')]},
  {id: 2, question: 'What blind restaurants are there?', answers: [new Answer(0, 'Dont know'), new Answer(1, 'yes in amsterdam maybe')]},
  {id: 3, question: 'Straight or curly hair for a first date?', answers: [new Answer(0, 'Curly!!'), new Answer(1, 'girll curly for sureee')]},
];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';

  displayedColumns: string[] = ['id', 'question', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor( public dialog: MatDialog) { }


  openAnswers(question: Question): void {
  console.log(question);
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      maxWidth: '50%',
      data: {Question: question}
    }); 
    dialogRef.afterClosed()
      .subscribe(res => {
    });
  
  }
  
}
