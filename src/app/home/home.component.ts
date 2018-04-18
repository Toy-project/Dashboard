import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

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
  public projectLoading: boolean = true;

  public carousel: NgxCarousel = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    speed: 600,
    interval: 3000,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
  }

  constructor(
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectList('createdAt', 10);
  }

  // get project list
  public getProjectList(field: string, limit: number): void {
    this.projectService.getProjectSortLimit(field, limit).onSnapshot((res) => {
      this.projectList = res.docs;
      this.projectLoading = false;
    });
  }

}
