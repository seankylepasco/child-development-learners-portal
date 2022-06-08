import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { StudentComponent } from 'src/app/student/student.component';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { SettingsComponent } from '../../modals/settings/settings.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  results: any;
  profile: any = '';
  userArray: any = ([] = []);
  info: any = {};
  user: any = {};
  pdfUpload: any = {};
  obj: any = {};
  pdf: any;
  type: any;
  modules: any;
  completed: any;
  arr: any = [];
  urlPDF: any = [];
  isLoading = true;
  isEmpty = false;

  constructor(
    private data: DataService,
    private router: Router,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
  BtnSound(): void {
    let audio = new Audio();
    audio.src = 'assets/click.mp3';
    audio.load();
    audio.play();
  }
  get staticUrlArray() {
    return StudentComponent.playSound;
  }
  getAll(): void {
    this.data.fetchData('modules', '').subscribe(
      (response: any) => {
        this.isLoading = false;
        this.modules = response.payload;
        localStorage.setItem('modules', JSON.stringify(this.modules));
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
    const modules = JSON.parse(localStorage.getItem('modules')!);

    if (modules) {
      this.checkifLoggedIn(modules);
    } else {
      this.checkifLoggedIn('');
    }
  }
  checkifLoggedIn(modules: any) {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile(modules);
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
  getProfile(modules: any): void {
    this.data
      .fetchData('user/' + this.info.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        this.profile = this.user[0];
        for (let index = 0; index < modules.length; index++) {
          this.getCompleted(this.profile.id, modules[index].id);
        }
      });
  }
  getFields(input: any, field: any) {
    let output = [];
    for (let index = 0; index < input.length; index++)
      output.push(input[index][field]);
    return output;
  }
  getCompleted(stud_id: any, file_id: any): void {
    this.data
      .fetchData('completed/' + file_id + '/' + stud_id, '')
      .subscribe((response: any) => {
        this.arr.push(response.payload[0]);
      });
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
