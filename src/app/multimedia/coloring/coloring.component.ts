import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-coloring',
  templateUrl: './coloring.component.html',
  styleUrls: ['./coloring.component.css'],
})
export class ColoringComponent implements OnInit {
  canvas: any;
  paths: any = [];
  brushWidthRange: any;
  color: any;
  img: any =
    '../assets/Fruits.jpg';

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
    this.canvas.setBackgroundImage(
      this.img,
      this.canvas.renderAll.bind(this.canvas)
    );
    this.canvas.setDimensions({
      width: parent?.offsetWidth,
      height: parent?.offsetHeight,
    });
    this.canvas.setBackgroundImage(
      this.img,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.width / 1200,
        scaleY: this.canvas.height / 1300,
      }
    );
  }
  colorInput() {
    this.changeColor(this.color);
  }
  changeColor(color: any): void {
    this.canvas.freeDrawingBrush.color = color;
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
        scaleX: this.canvas.width / 1200,
        scaleY: this.canvas.height / 1300,
      }
    );
  }
  print(): void {
    window.print();
  }
  changeWidth(): void {
    this.canvas.freeDrawingBrush.width = this.brushWidthRange;
  }
  goBack(): void {
    this.router.navigate(['student']);
  }
}
