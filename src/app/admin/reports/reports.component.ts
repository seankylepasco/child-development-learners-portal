import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { LogoutComponent } from 'src/app/modals/logout/logout.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports: any;
  type: any;
  user: any = {};
  profile: any = '';
  isLoading = true;
  isEmpty = false;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

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
  async checkifLoggedIn() {
    this.user = this.encryptStorage.getItem<any>('user');
    this.type = this.user.type;
    await this.getProfile();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    }
    await this.getReports();
  }
  getReports(): void {
    this.data.fetchData('reports', '').subscribe(
      (response: any) => {
        this.reports = response.payload;
        this.isLoading = false;
      },
      (error: any) => {
        if ((error.status = 404)) {
          this.isLoading = false;
          this.isEmpty = true;
        }
      }
    );
  }
  toDashboard(): void {
    this.router.navigate(['admin'])
  }
  toAddAnnouncement(): void {
    this.router.navigate(['add-announcement']);
  }
  toYears(): void {
    this.router.navigate(['years']);
  }
  toReports(): void {
    this.router.navigate(['reports']);
  }
  deleteReport(id: any): void {
    if (confirm('are you sure to remove this year')) {
      this.data
        .fetchData('delete_report/' + id, '')
        .subscribe((response: any) => {
          localStorage.setItem('page', 'reports');
          this.dialog.open(DeleteComponent, {
            height: 'fit-content',
            width: '500px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    }
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
