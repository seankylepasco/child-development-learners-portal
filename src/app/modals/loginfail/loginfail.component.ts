import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-loginfail',
  templateUrl: './loginfail.component.html',
  styleUrls: ['./loginfail.component.css']
})
export class LoginfailComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginfailComponent>) { }

  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    });
  }

}
