import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SettingsComponent } from '../modals/settings/settings.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  type: any;
  profile: any = '';
  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';
  user: any = {};
  info: any = {};
  userArray: any = ([] = []);
  windowScrolled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {
    this.getScreenSize();
  }

  screenHeight: any;
  screenWidth: any;

  ngOnInit(): void {
    this.checkifLoggedIn();
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  BtnSound():void{
    let audio = new Audio();
     audio.src = "assets/click.mp3";
      audio.load();
      audio.play();
  }

  checkifLoggedIn(): void {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
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
        for (let index = 0; index < this.user.length; index++) {
          this.profile = this.user[index];
        }
      });
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  toStudent(): void {
    this.BtnSound();
    this.router.navigate(['student']);
  }
  toSoe(): void {
    this.router.navigate(['soe']);
  }
  toStories(): void {
    this.BtnSound();
    this.router.navigate(['stories']);
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
  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
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
