import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MemberService } from '../../member/member.service';
import { AdminVisitService } from './admin-visit.service';

@Component({
  selector: 'app-admin-visit',
  templateUrl: './admin-visit.component.html',
  styleUrls: ['./admin-visit.component.scss']
})
export class AdminVisitComponent implements OnInit {

  public visitRender: boolean = false;
  public visitCard: Array<any> = [];
  public visitList: Array<any> = [{name: 'visit', series: []}];
  public visitType: Array<any> = [];
  public visitBrowser: Array<any> = [];

  constructor(
    public datePipe: DatePipe,
    public memberService: MemberService,
    public adminVisitService: AdminVisitService
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getAllVisitList();
  }

  // get visit list
  public getAllVisitList(): void {
    this.adminVisitService.getAllVisitList().get()
    .then((res) => {
      // render false
      this.visitRender = false;
      // value
      const getThisMonth = new Date().getMonth();
      let month: number = 0;
      let week: number = 0;
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
        const createdMonth = new Date(parseInt(doc.data().createdAt)).getMonth();
        // week visit 
        if (res.docs.length - 7 <= ind) {
          week += doc.data().visit;
          list.push({
            value: doc.data().visit,
            name: this.datePipe.transform(doc.data().createdAt, 'dd') + '일'
          });
        };
        // visit this month
        if (getThisMonth === createdMonth) {
          month += doc.data().visit;
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
      this.visitCard = [
        {name: 'Total', value: pc + mobile},
        {name: 'Month', value: month},
        {name: 'Week', value: week},
        {name: 'Today', value: res.docs[0].data().visit}
      ]
      // visit render
      this.visitRender = true;
    })
    .catch((err) => {
      // todo
    });
  }

}
