import { Component, OnInit, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss']
})
export class LayoutNavComponent implements OnInit {

  @Input() accessLevel: number; 

  public navPublicData: Array<any> = [
    {
      title: 'HOME',
      icon: 'fa fa-home',
      path: 'home'
    },
    {
      title: 'PROJECT',
      icon: 'fa fa-th',
      path: 'project',
      param: {
        sort: 'createdAt',
        page: 1
      }
    }
  ];

  public navAdminData: Array<any> = [
    {
      title: 'VISIT',
      icon: 'fas fa-eye',
      path: 'visit'
    },
    {
      title: 'PROJECT',
      icon: 'fas fa-window-restore',
      path: 'project'
    },
    {
      title: 'MEMBER',
      icon: 'fas fa-users',
      path: 'member'
    },
    {
      title: 'SETTING',
      icon: 'fa fa-cog',
      path: 'setting'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
