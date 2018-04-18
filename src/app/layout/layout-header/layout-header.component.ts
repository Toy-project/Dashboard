import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MessageService } from '../../message/message.service';
import { MemberService } from '../../member/member.service';
import { Message } from '../../shared/message/message';

import { MemberLoginComponent } from '../../member/member-login/member-login.component';
import { MemberSignupComponent } from '../../member/member-signup/member-signup.component';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  public messageCount: number;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public messageService: MessageService,
    public memberService: MemberService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getMessage();
  }

  // open & close login dialog event
  public openDialogLogin(): void {
    // open event
    let dialogRef = this.dialog.open(MemberLoginComponent, {
      minWidth: 300,
      maxWidth: 300,
      disableClose: true
    });
  }

  // open & close login dialog event
  public openDialogSignup(): void {
    // open event
    let dialogRef = this.dialog.open(MemberSignupComponent, {
      minWidth: 300,
      maxWidth: 300,
      disableClose: true
    });
  }

  // logout event
  public async onLogout() {
    try {
      // logout
      await this.memberService.logout();
      // reload
      window.location.reload();
    } catch(err) {
      // alert
      this.snackBar.open(this.message.failedLogout, 'CLOSE', {duration: 3000});
    }
  }

  // go project register page
  public goProjectRegister(): any {
    if (!this.memberService.user.logined) {
      // alert
      this.snackBar.open(this.message.requiredLogin, 'CLOSE', {duration: 3000});
      return false;
    } else if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.notEmailVerified, 'CLOSE', {duration: 3000});
      return false;
    } else {
      this.router.navigate(['/project', 'upload']);
    }
  }

  // get not read message
  public getMessage() {
    if (this.memberService.user.logined) {
      this.messageService.getAllMessageNotRead(this.memberService.user.uid).onSnapshot((res) => {
        this.messageCount = res.docs.length;
      }, (err) => {
        // todo
      })
    } else {
      // todo
    }
  }

}
