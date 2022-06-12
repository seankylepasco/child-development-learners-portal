import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ForgotComponent } from '../modals/forgot/forgot.component';
import { LoginComponentModal } from '../modals/login/login.component';
import { NoemailComponent } from '../modals/noemail/noemail.component';
import { LoginfailComponent } from '../modals/loginfail/loginfail.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  interval: any;
  type: any;
  student: boolean = true;
  successModal: boolean = false;
  failModal: boolean = false;
  mEmail: boolean = false;
  mPassword: boolean = false;
  userInput: any = {};
  user: any = {};
  userArray: any = ([] = []);
  email: string = '';
  password: string = '';
  timeLeft: number = 2;

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  back(): void {
    this.router.navigate(['welcome']);
  }

  BtnSound(): void {
    let audio = new Audio();
    audio.src = 'assets/click.mp3';
    audio.load();
    audio.play();
  }

  BtnSound2(): void {
    let audio = new Audio();
    audio.src = 'assets/404.mp3';
    audio.load();
    audio.play();
  }

  forgot() {
    this.BtnSound();
    if (!this.email) {
      this.BtnSound2();
      this.dialog.open(NoemailComponent, {
        width: '400px',
      });
    } else {
      const object = {
        email: this.email,
      };
      const sample = {
        email: this.email,
        status: 'pending!',
      };
      this.data.fetchData('user_exists', object).subscribe((response: any) => {
        if (response.status.remarks === 'success') {
          this.data.fetchData('send', sample).subscribe((response: any) => {
            this.dialog.open(ForgotComponent, {
              width: '400px',
            });
          });
        }
      });
    }
  }
  login() {
    this.BtnSound();
    if (this.email === '') {
      this.mEmail = true;
      this.mPassword = false;
    } else if (this.password === '') {
      this.mPassword = true;
      this.mEmail = false;
    } else {
      this.userInput.email = this.email;
      this.userInput.password = this.password;
      try {
        this.data
          .fetchData('login', this.userInput)
          .subscribe((response: any) => {
            if (response.status.remarks === 'success') {
              this.encryptStorage.setItem('user', response.payload);
              this.user = this.encryptStorage.getItem<any>('user');
              this.type = this.user.type;
              this.openLoginResult();
              if (Object.keys(this.user).length === 0) {
                this.openLoginResult();
                this.router.navigate(['welcome']);
              } else if (this.type === 'admin') {
                this.startTimerAdmin();
              } else if (this.type === 'student') {
                this.startTimerStudent();
              } else if (this.type === 'teacher') {
                this.startTimerTeacher();
              } else if (this.type === 'enrollee') {
                this.startTimer();
              } else {
                this.router.navigate(['welcome']);
              }
            } else if (response.status.remarks === 'failed') {
              this.openLoginFailed();
            } else {
              this.openLoginFailed();
            }
          });
      } catch (error) {}
    }
  }
  openLoginResult(): void {
    this.dialog.open(LoginComponentModal, {
      width: '400px',
    });
  }
  openLoginFailed(): void {
    this.BtnSound();
    this.dialog.open(LoginfailComponent, {
      width: '400px',
    });
  }
  startTimer(): void {
    setTimeout(this.toHome.bind(this), 2000);
  }
  startTimerAdmin(): void {
    setTimeout(this.toAdmin.bind(this), 2000);
  }
  startTimerTeacher(): void {
    setTimeout(this.toTeacher.bind(this), 2000);
  }
  startTimerStudent(): void {
    setTimeout(this.toStudent.bind(this), 2000);
  }
  failTimer(): void {
    setTimeout(this.toLogin.bind(this), 2000);
  }
  toHome(): void {
    this.router.navigate(['home']);
  }
  toAdmin(): void {
    this.router.navigate(['admin']);
  }
  toStudent(): void {
    this.router.navigate(['student']);
  }
  toTeacher(): void {
    this.router.navigate(['teacher']);
  }
  toLogin(): void {
    location.reload();
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
}
