import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SuccessComponent } from '../modals/success/success.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  type: any;
  students: any;
  totalStudents: any;
  totalEnrollees: any;
  user: any = {};
  info: any = {};
  page: number = 1;
  profile: any = '';
  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';
  userArray: any = ([] = []);
  windowScrolled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.checkifLoggedIn();
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  updateToEnrollee(data: any): void {
    if (confirm('Are you sure to remove this?')) {
      delete data.password;
      data.type = 'enrollee';
      this.data.fetchData('update_student', data).subscribe((response: any) => {
        localStorage.setItem('page', 'teacher');
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
  }
  getStudents(): void {
    this.data.fetchData('students', '').subscribe((response: any) => {
      this.students = response.payload;
      this.totalStudents = response.payload.length;
    });
  }
  getEnrollees(): void {
    this.data.fetchData('enrollees', '').subscribe((response: any) => {
      if (response.payload === null) this.totalEnrollees = 0;
      else this.totalEnrollees = response.payload.length;
    });
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
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    await this.getProfile();
    await this.getStudents();
    await this.getEnrollees();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher']);
    } else if (this.type === 'enrollee') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  toMasterList(): void {
    this.router.navigate(['masterlist']);
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
