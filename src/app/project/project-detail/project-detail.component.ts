import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import { ProjectService } from '../project.service';
import { MemberService } from '../../member/member.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { Message } from '../../shared/message/message';

import { ProjectDeleteComponent } from '../project-delete/project-delete.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  public key: string;
  public projectRender: boolean = false;
  public project: object = null;
  public projectLang: Array<any> = [];
  public projectColor: Array<any> = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public projectService: ProjectService,
    public memberService: MemberService,
    public cookieService: CookieService,
    public message: Message
  ) {
    this.key = this.activatedRoute.params['_value']['id'];
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectDetail();
    this.updateProjectView(this.key);
  }

  // get project detail
  public getProjectDetail(key: string = this.key) {
    this.projectService.getProject(key).subscribe((res) => {
      this.project = res;
      this.projectLang = res.language ? res.language.split(',') : [];
      this.projectColor = res.color ? res.color.split(',') : [];
      this.projectRender = true;
    })
  }

  // update project like
  public updateProjectLike(key: string): any {
    if (this.cookieService.getCookie(`${key}Like`)) {
      // alert
      this.snackBar.open(this.message.alreadyClickLike, 'CLOSE', {duration: 3000});
      return false;
    }
    // update
    this.projectService.updateProjectLike(key);
    // alert
    this.snackBar.open(this.message.successClickLike, 'CLOSE', {duration: 3000});
  }

  // update project view
  public updateProjectView(key: string): any {
    // cookie
    if (this.cookieService.getCookie(`${key}View`)) {
      return false;
    }
    // update view
    this.projectService.updateProjectView(key);
  }

  // open project delete dialog
  public deleteProject(): void {
    if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.notEmailVerified, 'CLOSE', {duration: 3000});
    } else {
      // key
      this.project['key'] = this.key;
      // open dialog
      let dialog = this.dialog.open(ProjectDeleteComponent, {
        minWidth: 300,
        maxWidth: 500,
        disableClose: true,
        data: this.project
      });
    }
  }

}
