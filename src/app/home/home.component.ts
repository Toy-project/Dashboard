import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { MemberService } from '../member/member.service';
import { ProjectService } from '../project/project.service';
import { VisitService } from '../shared/visit/visit.service';
import { GithubService } from '../shared/github/github.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectList: Array<any> = [];
  private projectListLoading: boolean = true;
  private visitRender: boolean = false;
  private visitList: Array<any> = [{name: 'visit', series: []}];
  private visitType: Array<any> = [];
  private visitBrowser: Array<any> = [];
  private githubList: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private memberService: MemberService,
    private projectService: ProjectService,
    private visitService: VisitService,
    private githubService: GithubService,
    private message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectList(10);
    this.getGithubPublicRepo('pushed', 'desc');
    this.getAllVisitList();
  }

  // get github user data
  private getGithubPublicRepo(order: string, dir: string): void {
    this.githubService.getGithubRepo(order, dir).subscribe((res) => {
      this.githubList = res;
    })
  }

  // get project list
  private getProjectList(limit: number): void {
    this.projectService.getProjectSortLimit('createdAt', limit).onSnapshot((res) => {
      this.projectList = res.docs;
      this.projectListLoading = false;
    });
  }

  // get visit list
  private getAllVisitList(): void {
    this.visitService.getAllVisitList().get()
    .then((res) => {
      // render false
      this.visitRender = false;
      // value
      let pc: number = 0;
      let mobile: number = 0;
      let ie: number = 0;
      let edge: number = 0;
      let chrome: number = 0;
      let firefox: number = 0;
      let safari: number = 0;
      let opera: number = 0;
      let etc: number = 0;
      let list: Array<any> = [];
      // value set
      res.docs.reverse().forEach((doc, ind) => {
        // week visit 
        if (res.docs.length - 7 <= ind) {
          list.push({
            value: doc.data().visit,
            name: this.datePipe.transform(doc.data().createdAt, 'dd') + '일'
          });
        };
        // visit type
        pc += doc.data().pc;
        mobile += doc.data().mobile;
        // visit browser
        ie += doc.data().ie;
        edge += doc.data().edge;
        chrome += doc.data().chrome;
        firefox += doc.data().firefox;
        safari += doc.data().safari;
        opera += doc.data().opera;
        etc += doc.data().etc;
      });
      // push value
      this.visitList[0].series = list;
      this.visitType = [
        {name: 'pc', value: pc},
        {name: 'mobile', value: mobile}
      ];
      this.visitBrowser = [
        {name: 'IE', value: ie},
        {name: 'Edge', value: edge},
        {name: 'Chrome', value: chrome},
        {name: 'Firefox', value: firefox},
        {name: 'Safari', value: safari},
        {name: 'Opera', value: opera},
        {name: 'ETC', value: etc}
      ];
      // visit render
      this.visitRender = true;
    })
    .catch((err) => {
      // todo
    });
  }

}
