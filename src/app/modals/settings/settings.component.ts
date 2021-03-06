import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit, HostBinding } from '@angular/core';
import { StudentComponent } from 'src/app/student/student.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user: any = {};
  info: any = {};
  userArray: any = ([] = []);
  empty = '';
  profile: any = '';
  table: any = '/users_tb';
  firstname: any;
  editMode: boolean = false;
  isDark: boolean = false;
  status: any;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(private router: Router, private data: DataService) {
    console.log(StudentComponent.playSound);
  }

  @HostBinding('class')
  get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  ngOnInit(): void {
    this.getProfile();
  }
  get staticUrlArray() {
    return StudentComponent.playSound;
  }
  offSounds(): void {
    StudentComponent.playSound = !StudentComponent.playSound;
  }
  darkMode(): void {}
  getProfile(): void {
    this.info = this.encryptStorage.getItem<any>('user');
    this.userArray.push(this.info);
    this.data
      .fetchData('user/' + this.info.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        for (let index = 0; index < this.user.length; index++) {
          this.profile = this.user[index];
        }
      });
  }
  getFields(input: any, field: any) {
    let output = [];
    for (let i = 0; i < input.length; i++) output.push(input[i][field]);
    return output;
  }
  toProfile(): void {
    this.router.navigate(['student-profile']);
  }
  toPrivacy(): void {
    this.router.navigate(['privacy']);
  }
  tocredits(): void {
    this.router.navigate(['credits']);
  }
}
