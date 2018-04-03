import { Component, OnInit } from '@angular/core';

import { AdminVisitService } from './admin/admin-visit/admin-visit.service';
import { NavigationService } from './shared/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public date: Date = new Date();

  constructor(
    public adminVisitService: AdminVisitService,
    public navigationService: NavigationService,
  ){ }

  ngOnInit() {
    this.adminVisitService.createAndUpdateVisit(this.date);
  }

  public backdropClick() {
    this.navigationService.navToggle();
  }

}
