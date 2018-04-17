import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

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

  public access: boolean;
  public accessFailedMessage: string;

  public messageList: Array<any> = [];
  public messageRender: boolean = false;

  constructor(
    public dialog: MatDialog,
    public memberService: MemberService,
    public messageService: MessageService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.access = this.memberService.user.logined ? true : false;
    this.accessFailedMessage = this.memberService.user.logined ? '' : this.message.requiredLogin;
    this.getMessageList(20);
  }

  // get message list
  public getMessageList(limit: number): any {
    // if not valid
    if (!this.memberService.user.logined) {
      return false;
    } else {
      // get message list
      this.messageService.getAllMessage(this.memberService.user.uid, limit).onSnapshot((res) => {
        this.messageList = res.docs;
        this.messageRender = true;
      });
    }
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
      // todo
    }
  }

}
