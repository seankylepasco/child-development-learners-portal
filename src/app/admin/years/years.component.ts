import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { LogoutComponent } from 'src/app/modals/logout/logout.component';
import { AddYearComponent } from 'src/app/modals/add-year/add-year.component';
import { ViewYearComponent } from 'src/app/modals/view-year/view-year.component';
@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css'],
})
export class YearsComponent implements OnInit {
  years: any;
  type: any;
  user: any = {};
  profile: any = '';
  userArray: any = ([] = []);

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
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
  checkifLoggedIn(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    }
    this.getYears();
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  getYears(): void {
    this.data.fetchData('years', '').subscribe((response: any) => {
      this.years = response.payload;
    });
  }
  toViewYear(id: any): void {
    localStorage.setItem('year_id', id);
    this.dialog.open(ViewYearComponent, {
      height: 'fit-content',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
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
  deleteYear(id: any): void {
    if (confirm('are you sure to remove this year')) {
      this.data
        .fetchData('delete_year/' + id, '')
        .subscribe((response: any) => {
          localStorage.setItem('page', 'years');
          this.dialog.open(DeleteComponent, {
            height: 'fit-content',
            width: '500px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    }
  }
  openAddYear(): void {
    this.dialog.open(AddYearComponent, {
      height: 'fit-content',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
  openLogout(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: 'fit-content',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
