import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { SuccessComponent } from '../../modals/success/success.component';
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
  userArray: any = ([] = []);
  profile: any = '';
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
    this.getTeacherModules();
  }
  checkifLoggedIn(): void {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
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
    localStorage.setItem('module', JSON.stringify(module));
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
