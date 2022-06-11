import { EncryptStorage } from 'encrypt-storage';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-score-activity',
  templateUrl: './score-activity.component.html',
  styleUrls: ['./score-activity.component.css'],
})
export class ScoreActivityComponent implements OnInit {

  file: any;
  module: any = {};

  encryptStorage = new EncryptStorage('secret-key', {
    prefix: '@instance1',
  });

  constructor(private domSanitizer: DomSanitizer, private data: DataService) {}

  ngOnInit(): void {
    this.getChosenModule();
  }

  getChosenModule(): void {
    this.module = this.encryptStorage.getItem<any>('module_chosen');
    this.file = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.module.file
    );
  }
  updateCompletedScore(): void {
    const object = {
      id: this.module.id,
      score: this.module.score,
    };
    this.data
      .fetchData('update_completed', object)
      .subscribe((response: any) => {
        alert('Score Updated!');
        window.location.reload();
      });
  }
}
