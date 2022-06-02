import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponentModal implements OnInit {
  results: any;
  userName: any;
  constructor(private dialogRef: MatDialogRef<LoginComponentModal>) {}
  ngOnInit(): void {
    this.results = localStorage.getItem('user');
    const user = JSON.parse(this.results);
    this.userName = user.firstname;
    this.dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    });
  }
}
