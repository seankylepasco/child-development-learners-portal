import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from 'src/app/modals/success/success.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: any;
  email: any;
  password: any;
  new_password: any;
  wrong_password: boolean = false;
  correct_password: boolean = false;

  constructor(private data: DataService, private dialog: MatDialog) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    this.email = user.email;
  }
  checkPassword(): void {
    const object = {
      email: this.email,
      password: this.password,
    };
    if (
      this.data.fetchData('login', object).subscribe((response: any) => {
        if (response.status.remarks === 'success') {
          this.wrong_password = false;
          this.correct_password = true;
        } else {
          this.wrong_password = true;
          this.correct_password = false;
        }
      })
    ) {
      this.wrong_password = true;
      this.correct_password = false;
    } else {
      this.wrong_password = true;
      this.correct_password = false;
    }
  }
  changePassword(): void {
    if (this.correct_password) {
      if (!this.new_password) this.new_password = this.password;
      const object = {
        id: this.user.id,
        email: this.user.email,
        password: this.new_password,
      };
      this.data.fetchData('update_user', object).subscribe((response: any) => {
        localStorage.setItem('page', 'student-profile');
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
      });
    } else {
      alert('Wrong password!');
    }
  }
}
