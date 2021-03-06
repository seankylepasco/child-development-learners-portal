import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css'],
})
export class TracingComponent implements OnInit {
  canvas: any;
  paths: any = [];
  img: any = 'assets/img/tracing/tracing.jpg';
  brushWidthRange: any;
  constructor(private router: Router) {}

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 90)
      this.removePath();
  }
  ngOnInit(): void {
    this.createCanvas();
  }
  BtnSound():void{
    let audio = new Audio();
     audio.src = "assets/click.mp3";
      audio.load();
      audio.play();
  }
  createCanvas(): void {
    let parent = document.getElementById('canvasContainer');
    this.canvas = new fabric.Canvas('colorCanvas', { isDrawingMode: true });
    this.canvas.freeDrawingBrush.width = '5';
    this.canvas.freeDrawingBrush.color = 'green';
    this.canvas.on('path:created', (event: any) => {
      this.paths.push(event.path.path);
    });
    this.canvas.setDimensions({
      width: parent?.offsetWidth,
      height: parent?.offsetHeight,
    });
    this.canvas.setBackgroundImage(
      this.img,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.width / 900,
        scaleY: this.canvas.height / 900,
      }
    );
  }
  changeColor(color: any): void {
    this.canvas.freeDrawingBrush.color = color;
  }
  changeWidth(): void {
    this.canvas.freeDrawingBrush.width = this.brushWidthRange;
  }
  removePath(): void {
    let array = this.paths;
    const lastItem = array[array.length - 1];
    this.canvas.getObjects('path').forEach((path: any) => {
      if (lastItem === path.path) {
        this.canvas.remove(path);
        array.pop();
      }
    });
    this.paths = array;
  }
  clear(): void {
    this.canvas.clear();
    this.canvas.setBackgroundImage(
      this.img,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.width / 900,
        scaleY: this.canvas.height / 900,
      }
    );
  }
  print(): void {
    window.print();
  }
  goBack(): void {
    this.router.navigate(['student']);
  }
  totracing1(): void {
    this.BtnSound();
    this.router.navigate(['tracing1']);
  }
  totracing2(): void {
    this.BtnSound();
    this.router.navigate(['tracing2']);
  } totracing3(): void {
    this.BtnSound();
    this.router.navigate(['tracing3']);
  } totracing4(): void {
    this.BtnSound();
    this.router.navigate(['tracing4']);
  } totracing5(): void {
    this.BtnSound();
    this.router.navigate(['tracing5']);
  } totracing6(): void {
    this.BtnSound();
    this.router.navigate(['tracing6']);
  } totracing7(): void {
    this.BtnSound();
    this.router.navigate(['tracing7']);
  } totracing8(): void {
    this.BtnSound();
    this.router.navigate(['tracing8']);
  }


}
