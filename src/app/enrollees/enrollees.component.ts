import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { SuccessComponent } from '../modals/success/success.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.css'],
})
export class EnrolleesComponent implements OnInit {
  profile: any = '';
  students: any;
  user: any = {};
  info: any = {};
  userArray: any = ([] = []);
  student: any = 'student';
  edit: any;
  userInput: any = {};
  type: any;
  total: any;
  page = 1;

  constructor(
    private datepipe: DatePipe,
    private router: Router,
    private dialog: MatDialog,
    private data: DataService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.checkifLoggedIn();
    this.getStudents();
  }
  updateToStudent(data: any): void {
    if (confirm('Are you sure to accept this?')) {
      delete data.password;
      data.type = 'student';
      this.data.fetchData('update_student', data).subscribe((response: any) => {
        localStorage.setItem('page', 'enrollees');
        this.dialog.open(SuccessComponent, {
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
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    }
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
  }
  getStudents(): void {
    this.data.fetchData('enrollees', '').subscribe((response: any) => {
      this.students = response.payload;
      this.total = response.payload.length;
    });
  }
  toMasterList(): void {
    this.router.navigate(['masterlist']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
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
