import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SuccessComponent } from '../modals/success/success.component';
import { ViewAnnouncementComponent } from '../modals/view-announcement/view-announcement.component';
import { CreateAnnouncementComponent } from '../modals/create-announcement/create-announcement.component';
@Component({
  selector: 'app-announcepost',
  templateUrl: './announcepost.component.html',
  styleUrls: ['./announcepost.component.css'],
})
export class AnnouncepostComponent implements OnInit {
  announcements: any;
  something = false;
  stud_id: any;
  img: any;
  type: any;
  pdfUpload: any = {};
  userInput: any = {};
  user: any = {};
  info: any = {};
  userArray: any = ([] = []);
  profile: any = '';
  submit: boolean = false;
  isLoading = true;
  isEmpty = false;
  Date: Date = new Date();
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
  openAddAnnouncement(): void {
    this.dialog.open(CreateAnnouncementComponent, {
      height: '101%',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
  getAnnouncements(): void {
    this.data.fetchData('teacher_announcements/' + this.info.id, '').subscribe(
      (response: any) => {
        this.isLoading = false;
        this.announcements = response.payload;
      },
      (error: any) => {
        console.log(error.status);
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
          console.log('change to none');
          console.log(this.isEmpty);
        }
      }
    );
  }
  checkifLoggedIn(): void {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    this.getAnnouncements();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    }
  }
  addAnnouncement(event: any): void {
    if (!event.target.title.value) alert('Title Missing!');
    else {
      this.userInput.img = this.img;
      this.userInput.title = event.target.title.value;
      this.userInput.description = event.target.descript.value;
      this.userInput.date = event.target.date.value;
      this.userInput.user_id = this.info.id;
      this.data
        .fetchData('add_announcement', this.userInput)
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
  viewAnnouncePost(data: any): void {
    localStorage.setItem('chosen_announcement', JSON.stringify(data));
    this.dialog.open(ViewAnnouncementComponent, {
      height: '101%',
      autoFocus: false,
      restoreFocus: false,
    });
  }
  checkedImage(event: any) {
    this.img = event.target.files[0];
    this.pdfUpload.file_title = this.img.name;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    };
    reader.readAsDataURL(this.img);
    this.submit = true;
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
  }
  toMasterList(): void {
    this.router.navigate(['masterlist']);
  }
  toClasses(): void {
    this.router.navigate(['classes']);
  }
  toScore(): void {
    this.router.navigate(['scores']);
  }
  toEnrollees(): void {
    this.router.navigate(['enrollees']);
  }
  toActivityPost(): void {
    this.router.navigate(['teacher-activity']);
  }
  openLogout(): void {
    this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: 'fit-content',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
