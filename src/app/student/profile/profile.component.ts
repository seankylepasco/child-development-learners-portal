import compress from 'compress-base64';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SuccessComponent } from 'src/app/modals/success/success.component';
import { ChangePasswordComponent } from 'src/app/modals/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  type: any = '';
  photo: any = '';
  profile: any = '';
  img: any = '';
  psa: any = '';
  info: any = {};
  user: any = {};
  name: any = {};
  userArray: any = ([] = []);
  table: any = '/users_tb';
  active: boolean = false;

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
  }
  goBack(): void {
    this.router.navigate(['student']);
  }
  updateProfile(): void {
    if (!this.photo) {
      this.profile.img = this.profile.img;
    } else {
      this.profile.img = this.photo;
    }
    if (!this.psa) {
      this.profile.psa = this.profile.psa;
    } else {
      this.profile.psa = this.psa;
    }

    delete this.profile.password;
    this.data
      .fetchData('update_user', this.profile)
      .subscribe((response: any) => {
        localStorage.setItem('page', 'student-profile');
        this.dialog.open(SuccessComponent, {
          height: 'fit-content',
          width: '300px',
          autoFocus: false,
          restoreFocus: false,
        });
      });
  }
  checkifLoggedIn(): void {
    this.info = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.info);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    if (Object.keys(this.info).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher']);
    } else if (this.type === 'guest') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  getFields(input: any, field: any) {
    let output = [];
    for (let i = 0; i < input.length; i++) output.push(input[i][field]);
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
  setPhoto(event: any): void {
    this.photo = event.target.files[0];
    if (event.target.files[0].type === 'image/png') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        compress(event.target.result, {
          width: 400,
          type: 'image/png',
          max: 200,
          min: 20,
          quality: 0.8,
        }).then((result) => {
          this.photo = result;
        });
      };
      reader.readAsDataURL(this.photo);
      this.active = true;
    } else if (event.target.files[0].type === 'image/jpg') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        compress(event.target.result, {
          width: 400,
          type: 'image/png',
          max: 200,
          min: 20,
          quality: 0.8,
        }).then((result) => {
          this.photo = result;
        });
      };
      reader.readAsDataURL(this.photo);
      this.active = true;
    } else if (event.target.files[0].type === 'image/jpeg') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        compress(event.target.result, {
          width: 400,
          type: 'image/png',
          max: 200,
          min: 20,
          quality: 0.8,
        }).then((result) => {
          this.photo = result;
        });
      };
      reader.readAsDataURL(this.photo);
      this.active = true;
    } else {
      alert('Not an image!');
    }
  }
  setPSA(event: any): void {
    this.psa = event.target.files[0];
    if (event.target.files[0].type === 'application/pdf') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.psa = event.target.result;
      };
      reader.readAsDataURL(this.psa);
      this.active = true;
    } else {
      alert('not a pdf');
    }
  }
  openChangePassword(): void {
    this.dialog.open(ChangePasswordComponent, {
      height: 'fit-content',
      width: '500px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
