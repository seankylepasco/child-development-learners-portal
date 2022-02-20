import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SettingsComponent } from '../modals/settings/settings.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcements: any;
  empty = '';
  user: any = {};
  info: any = {};
  profile: any = '';
  arr: any = [];
  constructor(private data: DataService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAnnouncements();
 
  }
  BtnSound():void{
    let audio = new Audio();
     audio.src = "assets/click.mp3";
      audio.load();
      audio.play();
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

  getAnnouncements() {
    this.data.fetchData('announcements', '').subscribe((response: any) => {
      let array = [];
      let results = response.payload;
      for (let i = 0; i < results.length; i++) {
        if (results[i].date === '0000-00-00') results[i].date = '';
        array.push(results[i]);
      }
      this.announcements = array;
    });
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
