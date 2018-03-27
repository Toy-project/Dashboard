import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MessageService } from '../../shared/message/message.service';

import { ContactReplyComponent } from '../contact-reply/contact-reply.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactDetailComponent>,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  // dialog close event
  private onClose(): void {
    this.dialogRef.close();
  }

  // delete event
  private onDelete(key: string): void {
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
  private onReply(key: string, data: any): void {
    // close now dialog
    this.onClose();
    // open dialog
    let dialogRef = this.dialog.open(ContactReplyComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true,
      data: data
    });
  }

}
