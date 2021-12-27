import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SuccessComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setTimer();
  }
  setTimer(): void {
    setTimeout(this.toPage.bind(this), 1500);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  toPage(): void {
    this.closeDialog();
    const page = localStorage.getItem('page');
    this.router.navigate([page]);
    localStorage.removeItem('page');
    window.location.reload();
  }
}
