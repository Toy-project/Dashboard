import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationService } from '../../shared/navigation/navigation.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public navigationService: NavigationService
  ) { }

  ngOnInit() {
  }

}
