import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { SuccessComponent } from '../../modals/success/success.component';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css'],
})
export class ArchivesComponent implements OnInit {
  isEmpty = false;
  type: any;
  students: any;
  totalStudents: any;
  totalEnrollees: any;
  user: any = {};
  info: any = {};
  page: number = 1;
  profile: any = '';
  search: any = '';
  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';
  windowScrolled = false;
  isLoading = true;
  Date: Date = new Date();

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.checkifLoggedIn();
  }
  updateToStudent(data: any): void {
    if (confirm('Are you sure to remove this?')) {
      delete data.password;
      data.type = 'student';
      this.data.fetchData('update_student', data).subscribe((response: any) => {
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
        this.getStudents();
      });
    } else {
    }
    this.getStudents();
  }
  getStudents(): void {
    this.students = [];
    this.data.fetchData('archived', '').subscribe(
      (response: any) => {
        this.isLoading = false;
        this.isEmpty = false;
        console.log(response.payload);
        this.students = response.payload;
        this.totalStudents = response.payload.length;
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
  }
  searchStudents(): void {
    this.students = [];
    this.data;
    this.data.fetchData('archived/' + this.search, '').subscribe(
      (response: any) => {
        this.isEmpty = false;
        this.students = response.payload;
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
  }
  async checkifLoggedIn() {
    this.info = this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    await this.getStudents();
    await this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['archive']);
    } else if (this.type === 'enrollee') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
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
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
