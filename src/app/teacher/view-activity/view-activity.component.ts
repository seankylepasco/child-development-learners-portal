import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from 'src/app/modals/delete/delete.component';
import { SuccessComponent } from '../../modals/success/success.component';
import { ScoreActivityComponent } from 'src/app/modals/score-activity/score-activity.component';
@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css'],
})
export class ViewActivityComponent implements OnInit {
  pdf: any;
  result: any;
  module: any = {};
  completed: any;
  submit: boolean = false;
  pdfUpload: any = {};
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
    this.getModule();
  }
  getModule(): void {
    this.result = this.encryptStorage.getItem<any>('module');
    this.data
      .fetchData('modules/' + this.result.id, '')
      .subscribe((response: any) => {
        this.module = response.payload[0];
        this.getCompleted(response.payload[0]);
      });
  }
  getCompleted(data: any): void {
    this.data.fetchData('completed_students/' + data.id, '').subscribe(
      (response: any) => {
        this.completed = response.payload;
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
  updateModule(): void {
    const object = {
      id: this.module.id,
      title: this.module.title,
      description: this.module.description,
      total_score: this.module.total_score,
      video_url: this.module.video_url,
      deadline: this.module.deadline,
      file: this.pdf,
      file_name: this.pdfUpload.file_name,
    };
    if (!this.pdf || !this.pdfUpload.file_name) delete object.file;
    delete object.file_name;
    this.data.fetchData('update_module', object).subscribe((response: any) => {
      this.encryptStorage.setItem('page', 'add-activity');
      this.dialog.open(SuccessComponent, {
        height: 'fit-content',
        width: '300px',
        autoFocus: false,
        restoreFocus: false,
      });
    });
  }
  deleteModule(): void {
    if (confirm('are you sure to delete ' + this.module.title + '?')) {
      this.data
        .fetchData('delete_module/' + this.module.id, '')
        .subscribe((response: any) => {});
      if (this.completed) {
        for (let index = 0; index < this.completed.length; index++) {
          this.data
            .fetchData('delete_completed/' + this.completed[index].id, '')
            .subscribe((response: any) => {});
        }
      }
      this.encryptStorage.removeItem('module');
      this.encryptStorage.removeItem('module_chosen');
      this.encryptStorage.setItem('page', 'teacher-activity');
      this.dialog.open(DeleteComponent, {
        height: 'fit-content',
        width: '300px',
        autoFocus: false,
        restoreFocus: false,
      });
    } else {
    }
  }
  openScoreActivity(data: any): void {
    this.encryptStorage.setItem('module_chosen', data);
    this.dialog.open(ScoreActivityComponent, {
      height: 'fit-content',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
  setPDF(event: any) {
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
      window.location.reload();
    }
  }
  toActivityPost(): void {
    this.router.navigate(['teacher-activity']);
    this.encryptStorage.removeItem('module');
  }
}
