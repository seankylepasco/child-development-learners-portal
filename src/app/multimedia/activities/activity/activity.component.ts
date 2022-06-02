import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { LogoutComponent } from 'src/app/modals/logout/logout.component';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { SuccessComponent } from 'src/app/modals/success/success.component';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  isDark: boolean = false;

  @HostBinding('class')
  get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  pdfUpload: any = {};
  user: any = {};
  activity: any = {};
  userArray: any = ([] = []);
  submit: boolean = false;
  pdf: any;
  id: any;
  title: any;
  description: any;
  file: any;
  url: any;
  file_name: any;
  stud_id: any;
  completed: any;

  constructor(
    private data: DataService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activity = JSON.parse(localStorage.getItem('activity') || '{}');
    this.id = this.activity.id;
    this.title = this.activity.title;
    this.description = this.activity.description;
    this.file = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.activity.file
    );
    this.url = this.domSanitizer.bypassSecurityTrustHtml(
      this.activity.video_url
    );
    this.file_name = this.activity.file_name;
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let array = this.userArray;
    let id = array.find((x: { id: string }) => x.id === x.id).id;
    this.stud_id = id;
    this.getCompleted();
  }
  transform(url: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getCompleted(): void {
    this.data
      .fetchData('completed/' + this.id + '/' + this.stud_id, '')
      .subscribe((response: any) => {
        this.completed = response.payload;
      });
  }
  setPDF(event: any): void {
    this.pdf = event.target.files[0];
    if (event.target.files[0].type === 'application/pdf') {
      this.pdfUpload.file_name = this.pdf.name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.pdf = event.target.result;
      };
      reader.readAsDataURL(this.pdf);
      this.submit = true;
    } else {
      alert('Not a pdf file!');
    }
  }
  sendPDF(): void {
    if (this.file === '') {
      alert('Empty Activity!');
    } else {
      this.pdfUpload.file = this.pdf;
      this.pdfUpload.file_id = this.id;
      this.pdfUpload.student_id = this.stud_id;
      this.pdfUpload.file_name = this.pdfUpload.file_name;
      this.data
        .fetchData('add_completed', this.pdfUpload)
        .subscribe((response: any) => {
          localStorage.setItem('page', 'activities');
          this.dialog.open(SuccessComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
          this.getCompleted();
        });
    }
  }
  back(): void {
    this.router.navigate(['activities']);
    localStorage.removeItem('activity');
  }
  remove(data: any): void {
    if (confirm('Are you sure to remove this?')) {
      this.data
        .fetchData('delete_completed/' + data.id, '')
        .subscribe((response: any) => {
          localStorage.setItem('page', 'activity');
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
  openLogout(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}

// private route: ActivatedRoute

// this.route.queryParams.subscribe((queryParams: any) => {
//   this.id = queryParams.id;
//   this.title = queryParams.title;
//   this.description = queryParams.description;
//   this.file = this.domSanitizer.bypassSecurityTrustResourceUrl(
//     queryParams.file
//   );
//   this.file_name = queryParams.file_name;
// });
