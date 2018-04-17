import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MemberService } from '../../member/member.service';
import { Message } from '../../shared/message/message';

import { MemberLevelComponent } from '../../member/member-level/member-level.component';

@Component({
  selector: 'app-admin-member',
  templateUrl: './admin-member.component.html',
  styleUrls: ['./admin-member.component.scss']
})
export class AdminMemberComponent implements OnInit {

  public memberRender: boolean = false;
  public memberCard: Array<any> = [];
  public memberList: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getMemberList(10000);
  }

  // get all member
  public getMemberList(limit: number): any {
    if (!this.memberService.user.logined) {
      return false;
    };

    this.memberService.getDatabaseUserList(limit).onSnapshot((res) => {
      // value
      const getThisMonth = new Date().getMonth();
      let month: number = 0;
      let admin: number = 0;
      let common: number = 0;
      // value set
      res.docs.forEach((doc, ind) => {
        // month
        const createdMonth = new Date(parseInt(doc.data().createdAt)).getMonth();
        if (createdMonth === getThisMonth) {
          month += 1; 
        }
        // admin or common
        if (doc.data().level > 1) {
          admin += 1;
        } else {
          common += 1;
        }
      });
      this.memberCard = [
        {name: 'Total', value: res.docs.length},
        {name: 'Month', value: month},
        {name: 'Admin', value: admin},
        {name: 'Common', value: common}
      ]
      this.memberList = res.docs;
      this.memberRender = true;
    });
  }

  // change level event
  public changeLevel(key: string): void {
    if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.notEmailVerified, 'CLOSE', {duration: 3000});
    } else {
      // open dialog
      let dialogRef = this.dialog.open(MemberLevelComponent, {
        minWidth: 300,
        maxWidth: 500,
        disableClose: true,
        data: {key: key}
      });
    }
  }

}
