import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { NavigationService } from '../../shared/navigation/navigation.service';
import { MemberService } from '../../member/member.service';
import { Message } from '../../shared/message/message';

import { MemberLoginComponent } from '../../member/member-login/member-login.component';
import { MemberSignupComponent } from '../../member/member-signup/member-signup.component';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss']
})
export class LayoutNavComponent implements OnInit {

  public messageCount: number;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public navigationService: NavigationService,
    public memberService: MemberService,
    public message: Message
  ) { }

  ngOnInit() {
  }

  // open & close login dialog event
  public openDialogLogin(): void {
    // open event
    let dialogRef = this.dialog.open(MemberLoginComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true
    });
  }

  // open & close login dialog event
  public openDialogSignup(): void {
    // open event
    let dialogRef = this.dialog.open(MemberSignupComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true
    });
  }

  // logout event
  public onLogout(): void {
    this.memberService.logout()
    .then(() => {
      // reload
      window.location.reload();
      // delete localStorage
      this.memberService.deleteLocalstorage();
    })
    .catch((err) => {
      // alert
      this.snackBar.open(this.message.failedLogout, 'CLOSE', {duration: 3000});
    });
  }

}
