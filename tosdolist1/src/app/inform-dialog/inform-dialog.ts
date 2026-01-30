import { Component, Inject, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-inform-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './inform-dialog.html',
  styleUrl: './inform-dialog.scss',
})
export class InformDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title:String,desc:String}) {   
  }

}
