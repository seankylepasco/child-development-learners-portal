import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../../modals/success/success.component';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
})
export class EditUsersComponent implements OnInit {
  user: any;
  password: any;
  type: any;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.encryptStorage.getItem<any>('user');
    this.type = this.user.type;
    this.getUser();
  }
  getUser(): void {
    const object = this.encryptStorage.getItem<any>('edit-users');
    this.data.fetchData('user/' + object.id, '').subscribe((response: any) => {
      this.user = response.payload[0];
    });
    this.data
      .fetchData('delete_report/' + object.report_id, '')
      .subscribe((response: any) => {});
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  updateUser(): void {
    if (!this.password) {
      delete this.user.password;
      this.data
        .fetchData('update_user', this.user)
        .subscribe((response: any) => {
          localStorage.setItem('page', 'edit-users');
          this.dialog.open(SuccessComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    } else {
      this.user.password = this.password;
      this.data
        .fetchData('update_user', this.user)
        .subscribe((response: any) => {
          localStorage.setItem('page', 'edit-users');
          this.dialog.open(SuccessComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    }
  }
  back(): void {
    this.encryptStorage.removeItem('edit-users');
    if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher-reports']);
    }
  }
  setPhoto(event: any): void {
    this.user.img = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.user.img = event.target.result;
    };
    reader.readAsDataURL(this.user.img);
  }
}
