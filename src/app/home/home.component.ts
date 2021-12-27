import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  type: any;

  student: any = 'student';
  admin: any = 'admin';
  teacher: any = 'teacher';

  user: any = {};
  userArray: any = ([] = []);

  noData = '';

  windowScrolled = false;
  nav: boolean = false;
  close: boolean = false;
  open: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
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
    let output = [];
    for (let index = 0; index < input.length; index++)
      output.push(input[index][field]);
    return output;
  }
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  toAnnouncements(): void {
    this.router.navigate(['announcement']);
  }
}
