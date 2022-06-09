import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { NewAnnouncementComponent } from 'src/app/modals/new-announcement/new-announcement.component';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css'],
})
export class AddAnnouncementComponent implements OnInit {
  announcements: any;
  id: any = '';
  isLoading = true;
  isEmpty = false;

  constructor(
    private data: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAnnouncements();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.id = user.id;
  }
  getAnnouncements(): void {
    this.data.fetchData('announcements', '').subscribe(
      (results: any) => {
        this.announcements = results.payload;
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
  back(): void {
    this.router.navigate(['student']);
  }
  openNewAnnouncement(): void {
    this.dialog.open(NewAnnouncementComponent, {
      height: '101%',
      autoFocus: false,
      restoreFocus: false,
    });
  }
  deleteAnnouncement(id: any): void {
    if (confirm('are you sure to delete this')) {
      this.data
        .fetchData('delete_announcement/' + id, '')
        .subscribe((response: any) => {
          localStorage.setItem('page', 'add-announcement');
          this.dialog.open(DeleteComponent, {
            height: 'fit-content',
            width: '300px',
            autoFocus: false,
            restoreFocus: false,
          });
        });
    }
  }
}
