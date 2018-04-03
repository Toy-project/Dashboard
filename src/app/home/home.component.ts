import { Component, OnInit } from '@angular/core';

import { MemberService } from '../member/member.service';
import { ProjectService } from '../project/project.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public projectList: Array<any> = [];

  constructor(
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
  }  

}
