import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MessageService } from '../message.service';

import { MessageReplyComponent } from '../message-reply/message-reply.component';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MessageDetailComponent>,
    public messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // delete event
  public onDelete(key: string): void {
    this.messageService.deleteMessage(key)
    .then(() => {
      // dialog close
      this.onClose();
    })
    .catch((err) => {
      // todo
    })
  }

  // reply event
  public onReply(key: string, data: any): void {
    // close now dialog
    this.onClose();
    // open dialog
    let dialogRef = this.dialog.open(MessageReplyComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true,
      data: data
    });
  }

}
