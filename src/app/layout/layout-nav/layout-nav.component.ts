import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MemberService } from '../../member/member.service';
import { MemberLoginComponent } from '../../member/member-login/member-login.component';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss']
})
export class LayoutNavComponent implements OnInit {

  @Input() public messageCount: number = 0;
  @Input() public navStatus: boolean;
  @Output() public navStatusChange = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public message: Message
  ) { }

  ngOnInit() {
  }

  // nav close event
  public navClose() {
    this.navStatusChange.emit(false);
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

  // logout event
  public onLogout(): void {
    this.memberService.logout()
    .then(() => {
      // delete localStorage
      this.memberService.deleteLocalstorage();
      // redirect
      window.location.reload();
    })
    .catch((err) => {
      this.snackBar.open(this.message.failedLogout, 'CLOSE', {duration: 3000});
    });
  }

}
