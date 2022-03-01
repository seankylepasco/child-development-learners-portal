import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from '../modals/delete/delete.component';
import { LogoutComponent } from '../modals/logout/logout.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any;
  type: any;
  students: any;
  totalLength: any;
  totalStudents: any;
  totalEnrollees: any;
  page: number = 1;
  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';
  user: any = {};
  userArray: any = ([] = []);
  windowScrolled = false;
  profile: any = '';
  search: any = '';
  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getEnrollees();
    this.getUsers();
    this.checkifLoggedIn();
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
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
  getStudents(): void {
    this.data.fetchData('students', '').subscribe((response: any) => {
      this.students = response.payload;
      this.totalStudents = response.payload.length;
    });
  }
  getUsers(): void {
    this.data
      .fetchData('users/' + this.search, '')
      .subscribe((response: any) => {
        this.users = response.payload;
        if (response.payload === null) this.totalLength = 0;
        else this.totalLength = response.payload.length;
      });
  }
  getEnrollees(): void {
    this.data.fetchData('enrollees', '').subscribe((response: any) => {
      if (response.payload === null) this.totalEnrollees = 0;
      else this.totalEnrollees = response.payload.length;
    });
  }
  remove(data: any): void {
    if (confirm('Are you sure to remove this?')) {
      this.data
        .fetchData('delete_user/' + data.id, '')
        .subscribe((response: any) => {
          localStorage.setItem('page', 'admin');
          this.dialog.open(DeleteComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    } else {
    }
  }
  checkifLoggedIn(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
      this.router.navigate(['student']);
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher']);
    } else if (this.type === 'guest') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  toDashboard(): void {
    this.router.navigate(['admin']);
  }
  toAddAnnouncement(): void {
    this.router.navigate(['add-announcement']);
  }
  toSuggestions(): void {
    this.router.navigate(['suggestion']);
  }
  toEditUsers(user: any): void {
    localStorage.setItem('edit-user', JSON.stringify(user));
    this.router.navigate(['edit-users']);
  }
  toYears(): void {
    this.router.navigate(['years']);
  }
  toReports(): void {
    this.router.navigate(['reports']);
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  openLogout(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
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
