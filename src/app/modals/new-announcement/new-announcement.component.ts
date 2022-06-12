import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../success/success.component';
@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.css'],
})
export class NewAnnouncementComponent implements OnInit {
  title: any;
  description: any;
  img: any;
  date: any;
  id: any = '';

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const user = this.encryptStorage.getItem<any>('user');
    this.id = user.id;
  }
  setPhoto(event: any): void {
    this.img = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    };
    reader.readAsDataURL(this.img);
  }
  addNewAnnouncement(): void {
    if (!this.title) alert('Missing announcement title!');
    const object = {
      title: this.title,
      description: this.description,
      img: this.img,
      date: this.date,
      user_id: this.id,
    };
    if (!this.date) delete object.date;
    if (!this.date) delete object.description;
    if (!this.date) delete object.img;
    this.data
      .fetchData('add_announcement', object)
      .subscribe((response: any) => {
        localStorage.setItem('page', 'add-announcement');
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
      });
  }
}
