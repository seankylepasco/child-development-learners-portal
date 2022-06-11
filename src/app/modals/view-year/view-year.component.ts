import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../success/success.component';
@Component({
  selector: 'app-view-year',
  templateUrl: './view-year.component.html',
  styleUrls: ['./view-year.component.css'],
})
export class ViewYearComponent implements OnInit {
  id: any = '';
  year: any = {};

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });
  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.id = this.encryptStorage.getItem<any>('year_id');
    this.getYear();
  }
  getYear(): void {
    this.data.fetchData('years', this.id).subscribe((response: any) => {
      this.year = response.payload[0];
    });
    this.encryptStorage.removeItem('year_id');
  }
  updateYear(): void {
    const object = {
      id: this.id,
      year: this.year.year,
    };
    this.data.fetchData('update_year', object).subscribe((response: any) => {
      this.dialog.open(SuccessComponent, {
        height: 'fit-content',
        width: '300px',
        autoFocus: false,
        restoreFocus: false,
      });
    });
    window.location.reload();
  }
}
