import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
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
    if (page === 'teacher-activity') {
      this.router.navigate([page]);
      localStorage.removeItem('page');
    } else {
      this.router.navigate([page]);
      localStorage.removeItem('page');
      window.location.reload();
    }
  }
}
