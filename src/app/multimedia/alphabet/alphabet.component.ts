import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
})
export class AlphabetComponent implements OnInit {
  constructor(private router: Router,) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['student']);
  }
  toterms(): void {
    this.router.navigate(['terms']);
  }
  
}
