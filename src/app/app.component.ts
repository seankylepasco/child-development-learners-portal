import { Component, HostBinding, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChildDevelopmentLearnersPortal';
  isDark: boolean = false;
  constructor(private updates: SwUpdate) {
    updates.available.subscribe((event: any) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  @HostBinding('class')
  get ThemeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  ngOnInit(): void {
    // this.playSound();
  }

  playSound() {
    let audio = new Audio();
    // audio.src = '../assets/The Polish Ambassador - Kids Music for Adults.mp3';

    audio.load();
    audio.play();
  }
}
