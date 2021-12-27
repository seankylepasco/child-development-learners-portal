import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcements: any;
  empty = '';

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }
  getAnnouncements() {
    this.data.fetchData('announcements', '').subscribe((response: any) => {
      let array = [];
      let results = response.payload;
      for (let i = 0; i < results.length; i++) {
        if (results[i].date === '0000-00-00') results[i].date = '';
        array.push(results[i]);
      }
      this.announcements = array;
    });
  }
  back(): void {
    this.router.navigate(['student']);
  }
}
