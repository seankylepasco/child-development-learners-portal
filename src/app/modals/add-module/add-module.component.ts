import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from '../../modals/success/success.component';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})
export class AddModuleComponent implements OnInit {
  pdf: any;
  type: any;
  profile: any = '';
  info: any = {};
  user: any = {};
  pdfUpload: any = {};
  userArray: any = ([] = []);

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

  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
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
  checkifLoggedIn(): void {
    this.info = this.encryptStorage.getItem<any>('user');
    this.type = this.info.type;
    this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    }
  }
  addActivity(event: any): void {
    if (!event.target.title.value) alert('Title Missing!');
    else if (!event.target.description.value) alert('Instructions Missing!');
    else if (!event.target.deadline.value) alert('Deadline Missing!');
    else {
      const object = {
        title: event.target.title.value,
        description: event.target.description.value,
        total_score: 4,
        video_url: event.target.video_url.value,
        deadline: event.target.deadline.value,
        file: this.pdf,
        file_name: this.pdfUpload.file_name,
        teacher_id: this.info.id,
      };
      if (!event.target.deadline.value) event.target.deadline.value = '';

      this.data.fetchData('add_module', object).subscribe((response: any) => {
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
      });
    }
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
    } else {
      alert('Not a pdf file!');
      window.location.reload();
    }
  }
}
