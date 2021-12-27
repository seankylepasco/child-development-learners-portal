import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  type: any;
  user: any = {};
  userArray: any = ([] = []);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
  }
  login(): void {
    this.router.navigate(['login']);
  }
  register(): void {
    this.router.navigate(['signup']);
  }
  checkifLoggedIn(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    } else if (this.type === 'admin') {
      this.router.navigate(['admin']);
    } else if (this.type === 'student') {
      this.router.navigate(['student']);
    } else if (this.type === 'teacher') {
      this.router.navigate(['teacher']);
    } else if (this.type === 'enrollee') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['welcome']);
    }
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
}
