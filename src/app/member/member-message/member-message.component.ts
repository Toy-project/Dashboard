import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { MemberService } from '../member.service';
import { MessageService } from '../../message/message.service';
import { Message } from '../../shared/message/message';

import { MessageDetailComponent } from '../../message/message-detail/message-detail.component';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss']
})
export class MemberMessageComponent implements OnInit {

  public messageList: Array<any> = [];
  public messageRender: boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public memberService: MemberService,
    public messageService: MessageService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getMessageList(20);
  }

  // get message list
  public getMessageList(limit: number): any {
    this.messageService.getAllMessage(this.memberService.user.uid, limit).onSnapshot((res) => {
      this.messageList = res.docs;
      this.messageRender = true;
    });
  }

  // update message read
  public async readMessage(key: string, data: any) {
    // open dialog
    let dialogRef = this.dialog.open(MessageDetailComponent, {
      minWidth: 300,
      maxWidth: 300,
      data: data
    });
    
    // update message read
    try {
      await this.messageService.updateMessageRead(key);
    } catch(err) {
      this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
    }
  }

}
