import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialogRef<LogoutComponent>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout() {
    this.closeDialog();
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  closeDialog(): void {
    this._dialog.closeAll();
  }
}
