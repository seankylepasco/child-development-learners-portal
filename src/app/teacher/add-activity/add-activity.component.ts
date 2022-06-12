import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { AddModuleComponent } from 'src/app/modals/add-module/add-module.component';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {
  page = 1;
  teacher_modules: any;
  total: any;
  pdf: any;
  type: any;
  stud_id: any;
  pdfUpload: any = {};
  userInput: any = {};
  submit: boolean = false;
  user: any = {};
  info: any = {};
  profile: any = '';
  isLoading = true;
  isEmpty = false;
  Date: Date = new Date();

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
  getTeacherModules(): void {
    this.data.fetchData('modules_teacher/' + this.info.id, '').subscribe(
      (response: any) => {
        this.isLoading = false;
        this.teacher_modules = response.payload;
        this.total = response.payload.length;
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
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
    this.getTeacherModules();
  }
  checkifLoggedIn(): void {
    this.info = this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    }
  }
  openAddActivity(): void {
    this.dialog.open(AddModuleComponent, {
      height: '101%',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  viewActivity(module: any): void {
    this.encryptStorage.setItem('module', module);
    this.toViewActivity();
  }

  toViewActivity(): void {
    this.router.navigate(['view-activity']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
  }
  toAnnouncementPost(): void {
    this.router.navigate(['announcepost']);
  }
  toReports(): void {
    this.router.navigate(['teacher-reports']);
  }
  toArchive(): void {
    this.router.navigate(['archive']);
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
  openLogout(): void {
    this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: 'fit-content',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
