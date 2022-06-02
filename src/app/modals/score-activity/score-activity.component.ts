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
  constructor(private domSanitizer: DomSanitizer, private data: DataService) {}

  ngOnInit(): void {
    this.getChosenModule();
  }

  getChosenModule(): void {
    this.module = JSON.parse(localStorage.getItem('module_chosen') || '{}');
    this.file = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.module.file
    );
  }
  updateCompletedScore(): void {
    // if (this.module.score > this.module.total_score)
    //   alert('Greater than total!');
    // else {
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
    // }
  }
}
