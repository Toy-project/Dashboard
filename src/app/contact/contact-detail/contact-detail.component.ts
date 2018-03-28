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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ContactDetailComponent>,
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
    let dialogRef = this.dialog.open(ContactReplyComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true,
      data: data
    });
  }

}
