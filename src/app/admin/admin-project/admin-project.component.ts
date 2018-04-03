import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MemberService } from '../../member/member.service';
import { ProjectService } from '../../project/project.service';
import { Message } from '../../shared/message/message';

import { ProjectDeleteComponent } from '../../project/project-delete/project-delete.component';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {

  public projectRender: boolean = false;
  public projectCard: Array<any> = [];
  public projectList: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectList('createdAt', 10000);
  }

  // get project list 
  public getProjectList(field: string, limit: number): any {
    if (!this.memberService.user.logined) {
      return false;
    };

    this.projectService.getProjectSortLimit(field, limit).onSnapshot((res) => {
      // value
      let web: number = 0;
      let app: number = 0;
      let api: number = 0;
      // value set
      res.docs.forEach((doc, ind) => {
        if (doc.data().type === 'web') {
          web += 1;
        } else if (doc.data().type === 'api') {
          api += 1;
        } else {
          app += 1;
        }
      });
      this.projectCard = [
        {name: 'Total', value: res.docs.length},
        {name: 'Web', value: web},
        {name: 'App', value: app},
        {name: 'Api', value: api}
      ]
      this.projectList = res.docs;
      this.projectRender = true;
    });
  }

  // delete project 
  // open project delete dialog
  public deleteProject(value: any, key: string): void {
    if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.NotemailVerified, 'CLOSE', {duration: 3000});
    } else {
      // key set
      value['key'] = key;
      // open dialog
      let dialog = this.dialog.open(ProjectDeleteComponent, {
        minWidth: 300,
        maxWidth: 500,
        disableClose: true,
        data: value
      });
    }
  }

}
