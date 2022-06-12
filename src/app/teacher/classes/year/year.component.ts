import 'jspdf-autotable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../../../modals/logout/logout.component';
import { SuccessComponent } from '../../../modals/success/success.component';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
})
export class YearComponent implements OnInit {
  type: any;
  years: any;
  class_year: any;
  totalYears: any;
  user: any = {};
  info: any = {};
  page: number = 1;
  profile: any = '';
  search: any = '';
  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';
  windowScrolled = false;
  isEmpty = false;
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
    this.class_year = this.encryptStorage.getItem<any>('class_year_id');
    this.checkifLoggedIn();
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    this.data.fetchData('classes/' + this.class_year, '').subscribe(
      (response: any) => {
        this.isLoading = false;
        const arr = response.payload;
        console.log(arr);
        arr.forEach((object: any) => {
          delete object['email'];
          delete object['birthdate'];
          delete object['address'];
          delete object['password'];
          delete object['gender'];
          delete object['img'];
          delete object['psa'];
          delete object['type'];
          delete object['year'];
        });
        console.log(arr);
        var output = arr.map(function (obj: any) {
          return Object.keys(obj)
            .sort()
            .map(function (key) {
              return obj[key];
            });
        });
        console.log(output);
        autoTable(doc, {
          head: [
            [
              'firstname',
              'id',
              'lastname',
              'middlename',
              'parent/guardian',
              'mobile number',
            ],
          ],
          body: output,
        });
        doc.save('class '+this.class_year);
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
  }

  updateToArchive(data: any): void {
    if (confirm('Are you sure to remove this?')) {
      delete data.password;
      data.type = 'archive';
      this.data.fetchData('update_student', data).subscribe((response: any) => {
        localStorage.setItem('page', 'teacher');
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
        this.getYears();
      });
    } else {
    }
  }

  getYears(): void {
    this.data.fetchData('classes/' + this.class_year, '').subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log(response.payload)
        this.years = response.payload;
        this.totalYears = response.payload.length;
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
  checkifLoggedIn() {
    this.info = this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    this.getProfile();
    this.getYears();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['year']);
    } else if (this.type === 'enrollee') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
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
    this.encryptStorage.removeItem('class_year_id');
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
  toTeacher(): void {
    this.router.navigate(['teacher']);
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
