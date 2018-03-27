import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MemberService } from '../../member/member.service';
import { MessageService } from '../../shared/message/message.service';
import { SettingService } from '../../setting/setting.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { Message } from '../../shared/message/message';
import { Observable } from 'rxjs/Observable';

import { MemberLoginComponent } from '../../member/member-login/member-login.component';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  public navStatus: boolean = false;
  private messageCount: number = 0;
  private defaultImage: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private messageService: MessageService,
    private settingService: SettingService,
    private cookieService: CookieService,
    private message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getDefaultImage();
    this.getMessageCount();
  }

  // navStatus Change
  private navStatusChange(bool): void {
    this.navStatus = bool;
  }

  // open login dialog
  private openDialogLogin(): void {
    let dialogRef = this.dialog.open(MemberLoginComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true
    });
  }

  // logout event
  private onLogout(): void {
    this.memberService.logout()
    .then(() => {
      // delete localStorage
      this.memberService.deleteLocalstorage();
      // redirect
      window.location.reload();
    })
    .catch((err) => {
      // alert
      this.snackBar.open(this.message.failedLogout, 'CLOSE', {duration: 3000});
    });
  }

  // get default image
  private getDefaultImage(): void {
    if (this.memberService.user.logined && !this.memberService.user.photoURL) {
      if (this.cookieService.getCookie('defaultImage')) {
        // if cookie
        this.defaultImage = this.cookieService.getCookie('defaultImage');
      } else {
        // not cookie
        this.settingService.getDefaultImage('member')
        .then((res) => {
          this.defaultImage = res.data().src;
          // set cookie
          this.cookieService.setCookie('defaultImage', res.data().src, 30);
        })
        .catch((err) => {
          // todo
        });
      }
    } else {
      // todo
    }
  }

  // get message count
  private getMessageCount(): void {
    if (this.memberService.user.logined) {
      this.messageService.getAllMessageNotRead(this.memberService.user.uid).onSnapshot((res) => {
        this.messageCount = res.docs.length;
      })
    } else {
      // todo
    }
  }

}
