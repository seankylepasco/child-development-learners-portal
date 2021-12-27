import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rhymes',
  templateUrl: './rhymes.component.html',
  styleUrls: ['./rhymes.component.css']
})
export class RhymesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.router.navigate(['student']);
  }
}
