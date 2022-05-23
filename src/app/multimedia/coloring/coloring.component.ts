
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coloring',
  templateUrl: './coloring.component.html',
  styleUrls: ['./coloring.component.css'],
})
export class ColoringComponent implements OnInit {
 
  constructor(private router: Router) {}

  BtnSound():void{
    let audio = new Audio();
     audio.src = "assets/click.mp3";
      audio.load();
      audio.play();
  }
  ngOnInit(): void {
    
  }
  
  goBack(): void {
    this.router.navigate(['student']);
  }
  tocoloring1(): void {
    this.BtnSound();
    this.router.navigate(['coloring1']);
  }
  tocoloring2(): void {
    this.BtnSound();
    this.router.navigate(['coloring2']);
  } tocoloring3(): void {
    this.BtnSound();
    this.router.navigate(['coloring3']);
  } tocoloring4(): void {
    this.BtnSound();
    this.router.navigate(['coloring4']);
  } tocoloring5(): void {
    this.BtnSound();
    this.router.navigate(['coloring5']);
  } tocoloring6(): void {
    this.BtnSound();
    this.router.navigate(['coloring6']);
  } tocoloring7(): void {
    this.BtnSound();
    this.router.navigate(['coloring7']);
  } tocoloring8(): void {
    this.BtnSound();
    this.router.navigate(['coloring8']);
  }
}
