import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-soe',
  templateUrl: './soe.component.html',
  styleUrls: ['./soe.component.css'],
})
export class SoeComponent implements OnInit {
  soe: any;
  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getSEO();
  }

  getSEO(): void {
    this.data.fetchData('soe', '').subscribe((response: any) => {
      console.log(response.payload);
      this.soe = response.payload;
    });
  }
  back(): void {
    this.router.navigate(['student']);
  }
}
