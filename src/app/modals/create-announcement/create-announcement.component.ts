import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage'
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../../modals/success/success.component';
@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css'],
})
export class CreateAnnouncementComponent implements OnInit {
  img: any;
  type: any;
  profile: any = '';
  info: any = {};
  user: any = {};


  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  getProfile(): void {
    this.data
      .fetchData('user/' + this.info.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        for (let index = 0; index < this.user.length; index++) {
          this.profile = this.user[index];
        }
      });
  }
  checkifLoggedIn(): void {
    this.info = this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    }
  }
  addAnnouncement(event: any): void {
    if (!event.target.title.value) alert('Title Missing!');
    else {
      const object = {
        img: this.img,
        title: event.target.title.value,
        description: event.target.descript.value,
        date: event.target.date.value,
        user_id: this.info.id,
      };
      this.data
        .fetchData('add_announcement', object)
        .subscribe((response: any) => {
          localStorage.setItem('page', 'announcepost');
          this.dialog.open(SuccessComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    }
  }
  setImage(event: any) {
    if (event.target.files[0].type === 'image/jpeg') {
      this.checkedImage(event);
    } else if (event.target.files[0].type === 'image/jpg') {
      this.checkedImage(event);
    } else if (event.target.files[0].type === 'image/png') {
      this.checkedImage(event);
    } else alert('Not an Image!');
  }
  checkedImage(event: any) {
    this.img = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    };
    reader.readAsDataURL(this.img);
  }
}
