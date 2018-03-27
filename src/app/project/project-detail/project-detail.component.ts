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

  private key: string;
  private project: object = null;
  private projectLang: Array<any> = [];
  private projectColor: Array<any> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private memberService: MemberService,
    private cookieService: CookieService,
    private message: Message
  ) {
    this.key = this.activatedRoute.params['_value']['id'];
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectDetail();
    this.updateProjectView(this.key);
  }

  // get project detail
  private getProjectDetail(key: string = this.key) {
    this.projectService.getProject(key).subscribe((res) => {
      this.project = res;
      this.projectLang = res.language ? res.language.split(',') : [];
      this.projectColor = res.color ? res.color.split(',') : [];
    })
  }

  // update project like
  private updateProjectLike(key: string): any {
    // not login
    if (!this.memberService.user.logined) {
      // alert
      this.snackBar.open(this.message.requiredLogin, 'CLOSE', {duration: 3000});
      return false;
    };
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
  private updateProjectView(key: string): any {
    // cookie
    if (this.cookieService.getCookie(`${key}View`)) {
      return false;
    }
    // update view
    this.projectService.updateProjectView(key);
  }

  // open project delete dialog
  private deleteProject(): void {
    if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.NotemailVerified, 'CLOSE', {duration: 3000});
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
