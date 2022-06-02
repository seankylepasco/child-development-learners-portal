import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
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
  isLoading = true;
  isEmpty = false;
  Date: Date = new Date();
  constructor(
    private datepipe: DatePipe,
    private router: Router,
    private dialog: MatDialog,
    private data: DataService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private domSanitizer: DomSanitizer
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
      delete data.psa;
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
    console.log(data);
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
    this.data.fetchData('enrollees', '').subscribe(
      (response: any) => {
        this.isLoading = false;
        const results = response.payload;
        for (let i = 0; i < response.payload.length; i++) {
          if (results[i].psa) {
            results[i].psa = this.transform(results[i].psa);
          }
        }
        this.total = response.payload.length;
        this.students = results;
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
  }
  transform(url: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  toMasterList(): void {
    this.router.navigate(['masterlist']);
  }
  toClasses(): void {
    this.router.navigate(['classes']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
  }
  toScore(): void {
    this.router.navigate(['scores']);
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
