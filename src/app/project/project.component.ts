import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from './project.service';
import { MemberService } from '../member/member.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projectList: Array<any> = [];
  public projectSort: string = this.activatedRoute.snapshot.params.sort;
  public projectPage: number = parseInt(this.activatedRoute.snapshot.params.page);
  public projectLimit: number = 12;
  public projectLoading: boolean = true;
  public projectAllCount: number;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectAllCount();
    this.getProjectList(this.projectSort, (this.projectPage * this.projectLimit));
  }

  ngOnDestroy() {
  }

  // get project all count
  public getProjectAllCount(): void {
    this.projectService.getProjectAllCount().onSnapshot((res) => {
      this.projectAllCount = res.docs.length;
    })
  }

  // get project list
  public getProjectList(field: string, limit: number): void {
    this.projectService.getProjectSortLimit(field, limit).onSnapshot((res) => {
      this.projectList = res.docs;
      this.projectLoading = false;
    });
  }

  // change sort
  public onChangeSort() {
    this.projectPage = this.projectPage > 1 ? 1 : this.projectPage; 
    this.router.navigate(['/project', {sort: this.projectSort, page: this.projectPage}]);
    this.getProjectList(this.projectSort, (this.projectPage * this.projectLimit));
  }

  // project more event
  public projectMore() {
    this.projectPage = this.projectPage + 1;
    this.router.navigate(['/project', {sort: this.projectSort, page: this.projectPage}]);
    this.getProjectList(this.projectSort, (this.projectPage * this.projectLimit));
  }

}
