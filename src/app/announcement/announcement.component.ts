import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { StudentComponent } from 'src/app/student/student.component';
import { SettingsComponent } from '../modals/settings/settings.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  type: any;
  userArray: any = ([] = []);
  announcements: any;
  empty = '';
  user: any = {};
  info: any = {};
  profile: any = '';
  arr: any = [];
  isEmpty = false;
  isLoading = true;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(
    private data: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAnnouncements();
    this.checkifLoggedIn();
  }
  get staticUrlArray() {
    return StudentComponent.playSound;
  }
  BtnSound(): void {
    let audio = new Audio();
    audio.src = 'assets/click.mp3';
    audio.load();
    audio.play();
  }
 async checkifLoggedIn() {
    this.info =  this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    await this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher']);
    } else if (this.type === 'guest') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  getFields(input: any, field: any) {
    let output = [];
    for (let index = 0; index < input.length; index++)
      output.push(input[index][field]);
    return output;
  }
  getProfile(): void {
    this.data
      .fetchData('user/' + this.info.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        this.profile = this.user[0];
      });
  }

  getAnnouncements() {
    this.data.fetchData('announcements', '').subscribe(
      (response: any) => {
        let array = [];
        let results = response.payload;
        for (let i = 0; i < results.length; i++) {
          if (results[i].date === '0000-00-00') results[i].date = '';
          array.push(results[i]);
        }
        this.announcements = array;
        this.isLoading = false;
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
  }
  back(): void {
    this.router.navigate(['student']);
  }

  goBack(): void {
    this.BtnSound();
    this.router.navigate(['home']);
  }
  goToActivity(activity: any): void {
    this.BtnSound();
    this.router.navigate(['activity']);
    localStorage.setItem('activity', JSON.stringify(activity));
  }
  toStudent(): void {
    this.BtnSound();
    this.router.navigate(['student']);
  }
  toStories(): void {
    this.BtnSound();
    this.router.navigate(['stories']);
  }
  toSoe(): void {
    this.router.navigate(['soe']);
  }
  toRhymes(): void {
    this.BtnSound();
    this.router.navigate(['rhymes']);
  }
  toNumbers(): void {
    this.BtnSound();
    this.router.navigate(['numbers']);
  }
  toActivities(): void {
    this.BtnSound();
    this.router.navigate(['activities']);
  }
  toAlphabet(): void {
    this.BtnSound();
    this.router.navigate(['alphabet']);
  }
  toTracing(): void {
    this.BtnSound();
    this.router.navigate(['tracing']);
  }
  toColoring(): void {
    this.BtnSound();
    this.router.navigate(['coloring']);
  }
  toAnnouncement(): void {
    this.BtnSound();
    this.router.navigate(['announcement']);
  }
  openSettings(): void {
    this.BtnSound();
    this.dialog.open(SettingsComponent, {
      width: '400px',
    });
  }
  getCompleted(stud_id: any, file_id: any): void {
    this.data
      .fetchData('completed/' + file_id + '/' + stud_id, '')
      .subscribe((response: any) => {
        this.arr.push(response.payload[0]);
      });
  }

  openLogout(): void {
    this.BtnSound();
    this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: 'fit-content',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
