import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from 'src/app/modals/logout/logout.component';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css'],
})
export class TeacherReportsComponent implements OnInit {
  reports: any;
  type: any;
  user: any = {};
  profile: any = '';
  isLoading = true;
  isEmpty = false;
  Date: Date = new Date();

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
  }

  getProfile(): void {
    this.data
      .fetchData('user/' + this.user.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        for (let index = 0; index < this.user.length; index++) {
          this.profile = this.user[index];
        }
      });
  }
  async checkifLoggedIn() {
    this.user = this.encryptStorage.getItem<any>('user');
    this.type = this.user.type;
    await this.getProfile();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    }
    await this.getReports();
  }
  getReports(): void {
    this.data.fetchData('reports', '').subscribe(
      (response: any) => {
        this.reports = response.payload;
        this.isEmpty = false;
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
  toEditUsers(stud_id: any): void {
    this.encryptStorage.setItem('edit-users', stud_id);
    this.router.navigate(['edit-users']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
  }
  toArchive(): void {
    this.router.navigate(['archive']);
  }
  toReports(): void {
    this.router.navigate(['teacher-reports']);
  }
  toMasterList(): void {
    this.router.navigate(['masterlist']);
  }
  toClasses(): void {
    this.router.navigate(['classes']);
  }
  toEnrollees(): void {
    this.router.navigate(['enrollees']);
  }
  toAnnouncementPost(): void {
    this.router.navigate(['announcepost']);
  }
  toActivityPost(): void {
    this.router.navigate(['teacher-activity']);
  }
  toScore(): void {
    this.router.navigate(['scores']);
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
