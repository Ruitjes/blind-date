import { Component } from '@angular/core';
import { Question } from './models/Question';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../src/app/popup-dialog/popup-dialog.component';
import { Answer } from './models/Answer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';

  constructor() { }

}
