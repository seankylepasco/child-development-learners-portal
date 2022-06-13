import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.router.navigate(['student']);
  }
}
