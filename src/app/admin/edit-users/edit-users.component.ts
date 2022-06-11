import { Router } from '@angular/router';
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
  user: any = '';
  password: any;
  type: any;
  userArray: any = ([] = []);

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    console.log(this.type);
    this.getUser();
  }
  getUser(): void {
    const object = JSON.parse(localStorage.getItem('edit-user') || '{}');
    this.data.fetchData('user/' + object.id, '').subscribe((response: any) => {
      this.user = response.payload[0];
    });
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
    this.router.navigate(['admin']);
    localStorage.removeItem('edit-user');
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
