import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../success/success.component';
@Component({
  selector: 'app-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.css'],
})
export class AddYearComponent implements OnInit {
  year: any = '';
  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {}
  addYear(): void {
    const object = {
      year: this.year,
    };
    this.data.fetchData('add_year', object).subscribe((response: any) => {
      localStorage.setItem('page', 'years');
      this.dialog.open(SuccessComponent, {
        height: 'fit-content',
        width: '300px',
        autoFocus: false,
        restoreFocus: false,
      });
    });
  }
}
