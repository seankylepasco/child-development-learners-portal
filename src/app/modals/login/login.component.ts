import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponentModal implements OnInit {
  results: any;
  userName: any;
  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  constructor(private dialogRef: MatDialogRef<LoginComponentModal>) {}
  ngOnInit(): void {
    this.results = this.encryptStorage.getItem<any>('user');
    const user = this.results;
    this.userName = user.firstname;
    this.dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    });
  }
}
