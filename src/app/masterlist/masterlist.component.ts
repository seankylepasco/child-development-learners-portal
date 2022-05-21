import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../modals/logout/logout.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class MasterlistComponent implements OnInit {
  psa: any = [];
  page: number = 1;
  profile: any = '';
  search: any = '';
  type: any;
  students: any;
  total: any;
  student: any = 'student';
  userArray: any = ([] = []);
  userInput: any = {};
  info: any = {};
  user: any = {};
  Date: Date = new Date();
  constructor(
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private router: Router,
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
  searchStudents(): void {
    this.students = [];
    this.data
      .fetchData('search_students/' + this.search, '')
      .subscribe((response: any) => {
        this.students = response.payload;
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
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  getStudents(): void {
    this.data.fetchData('students', '').subscribe((response: any) => {
      const results = response.payload;
      this.total = results.length;
      for (let i = 0; i < response.payload.length; i++) {
        if (results[i].psa) {
          results[i].psa = this.transform(results[i].psa);
        }
        console.log(results.psa);
      }
      this.students = results;
    });
  }
  transform(url: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  toScore(): void {
    this.router.navigate(['scores']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
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
