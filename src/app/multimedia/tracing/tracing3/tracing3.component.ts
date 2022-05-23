import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-tracing3',
  templateUrl: './tracing3.component.html',
  styleUrls: ['./tracing3.component.css']
})
export class Tracing3Component implements OnInit {

 
  canvas: any;
  paths: any = [];
  img: any = 'assets/img/tracing/circle.png';
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
        scaleX: this.canvas.width / 2800,
        scaleY: this.canvas.height / 2900,
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
        scaleX: this.canvas.width / 2800,
        scaleY: this.canvas.height /2900,
      }
    );
  }
  print(): void {
    window.print();
  }
  goBack(): void {
    this.router.navigate(['tracing']);
  }
}
