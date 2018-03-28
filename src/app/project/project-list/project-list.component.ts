import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../project.service';
import { MemberService } from '../../member/member.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() public projectList: Array<any>;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public projectService: ProjectService,
    public memberService: MemberService,
    public cookieService: CookieService,
    public message: Message
  ) { }

  ngOnInit() {
  }

  // update project like
  public updateProjectLike(key: string): any {
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

}
