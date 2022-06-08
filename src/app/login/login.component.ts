import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponentModal } from '../modals/login/login.component';
import { LoginfailComponent } from '../modals/loginfail/loginfail.component';
import { ForgotComponent } from '../modals/forgot/forgot.component';
import { NoemailComponent } from '../modals/noemail/noemail.component';

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
              localStorage.setItem('user', JSON.stringify(response.payload));
              this.user = JSON.parse(localStorage.getItem('user') || '{}');
              this.userArray.push(this.user);
              let type = this.getFields(this.userArray, 'type');
              this.type = type.toString();
              this.openLoginResult();
              // this.successModal = true;
              if (Object.keys(this.user).length === 0) {
                this.openLoginResult();
                // this.successModal = true;
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
              // this.failModal = true;
              // this.failTimer();
            } else {
              // this.failModal = true;
              this.openLoginFailed();
              // this.failTimer();
            }
          });
      } catch (error) {}
    }
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; i++) output.push(input[i][field]);
    return output;
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
