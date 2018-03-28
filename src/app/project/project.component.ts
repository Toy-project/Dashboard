import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from './project.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projectList: Array<any> = [];
  public projectLoading: boolean = true;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.getProjectList('createdAt', 12);
  }

  // get project list
  public getProjectList(field: string, limit: number) {
    this.projectService.getProjectSortLimit(field, limit).onSnapshot((res) => {
      this.projectList = res.docs;
      this.projectLoading = false;
    });
  }

}
