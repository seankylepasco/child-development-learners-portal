import 'jspdf-autotable';
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { LogoutComponent } from '../../modals/logout/logout.component';
import { SuccessComponent } from '../../modals/success/success.component';

interface jsPDFWithPlugin extends jsPDF {
  autotable: (options: UserOptions) => jsPDF;
}
@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})
export class ScoresComponent implements OnInit {
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
  userArray: any = ([] = []);
  windowScrolled = false;
  isLoading = true;
  isEmpty = false;
  Date: Date = new Date();

  constructor(
    public datepipe: DatePipe,
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
  downloadPDF(): void {
    const doc = new jsPDF();
    this.data.fetchData('scores', '').subscribe(
      (response: any) => {
        this.isLoading = false;
        const arr = response.payload;
        arr.forEach((object: any) => {
          delete object['date_created'];
          delete object['file'];
          delete object['file_id'];
          delete object['file_name'];
          delete object['date_created'];
          delete object['id'];
        });
        var output = arr.map(function (obj: any) {
          return Object.keys(obj)
            .sort()
            .map(function (key) {
              return obj[key];
            });
        });
        autoTable(doc, {
          head: [['firstname', 'lastname', 'score', 'student number', 'activity', 'total score']],
          body: output,
        });
        doc.save('scores');
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
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
    this.data.fetchData('scores', '').subscribe(
      (response: any) => {
        this.isLoading = false;
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
  searchStudents(): void {
    this.students = [];
    this.data
      .fetchData('scores/' + this.search, '')
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
  async checkifLoggedIn() {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    await this.getProfile();
    await this.getStudents();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['scores']);
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
  toTeacher(): void {
    this.router.navigate(['teacher']);
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
