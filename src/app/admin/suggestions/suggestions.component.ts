import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/modals/logout/logout.component';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  suggestions: any;
  type: any;
  user: any = {};
  profile: any = '';
  userArray: any = ([] = []);

  constructor(
    private router: Router,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkifLoggedIn();
  }

  getProfile(): void {
    this.data
      .fetchData('user/' + this.user.id, '')
      .subscribe((response: any) => {
        this.user = response.payload;
        for (let index = 0; index < this.user.length; index++) {
          this.profile = this.user[index];
        }
      });
  }
  checkifLoggedIn(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userArray.push(this.user);
    let type = this.getFields(this.userArray, 'type');
    this.type = type.toString();
    this.getProfile();
    if (Object.keys(this.user).length === 0) {
      this.router.navigate(['welcome']);
    }
    this.getSuggestions();
  }
  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }
  getSuggestions(): void {
    this.data.fetchData('suggestions', '').subscribe((response: any) => {
      this.suggestions = response.payload;
    });
  }
  toDashboard(): void {
    this.router.navigate(['admin']);
  }
  toAddAnnouncement(): void {
    this.router.navigate(['add-announcement']);
  }
  toYears(): void {
    this.router.navigate(['years']);
  }
  openLogout(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      height: 'fit-content',
      width: 'fit-content',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
