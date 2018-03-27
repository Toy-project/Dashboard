import { Component, OnInit } from '@angular/core';

import { VisitService } from './shared/visit/visit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private date: Date = new Date();

  constructor(
    private visitService: VisitService,
  ){ }

  ngOnInit() {
    this.visitService.createAndUpdateVisit(this.date);
  }

}
