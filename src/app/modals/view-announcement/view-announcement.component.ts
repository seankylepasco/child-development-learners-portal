import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../../modals/success/success.component';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css'],
})
export class ViewAnnouncementComponent implements OnInit {
  title: any;
  description: any;
  img: any;
  date: any;
  id: any;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAnnouncement();
  }
  getAnnouncement(): void {
    const object = this.encryptStorage.getItem<any>('chosen_announcement');
    this.data
      .fetchData('announcements/' + object.id, '')
      .subscribe((response: any) => {
        const announcement = response.payload[0];
        this.id = announcement.id;
        this.title = announcement.title;
        this.description = announcement.description;
        this.img = announcement.img;
        this.date = announcement.date;
      });
    this.encryptStorage.removeItem('chosen_announcement');
  }
  setPhoto(event: any): void {
    this.img = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    };
    reader.readAsDataURL(this.img);
  }
  updateAnnouncement(): void {
    const object = {
      id: this.id,
      title: this.title,
      description: this.description,
      img: this.img,
      date: this.date,
    };
    this.data
      .fetchData('update_announcement', object)
      .subscribe((response: any) => {
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
      });
  }
  deleteAnnouncement() {
    if (confirm('Are you sure to remove this?')) {
      this.data
        .fetchData('delete_announcement/' + this.id, '')
        .subscribe((response: any) => {
          this.dialog.open(DeleteComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    } else {
    }
  }
}
