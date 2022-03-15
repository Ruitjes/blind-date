import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Question} from '../models/Question';
@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent implements OnInit {
 
  constructor( public dialogRef: MatDialogRef<PopupDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
question: Question | undefined;
  ngOnInit(): void {
    
    this.question = this.data.Question;
    console.log(this.question);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
