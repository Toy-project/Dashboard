import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../../member/member.service';
import { MessageService } from '../../shared/message/message.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-contact-reply',
  templateUrl: './contact-reply.component.html',
  styleUrls: ['./contact-reply.component.scss']
})
export class ContactReplyComponent implements OnInit {

  public replyLoding: boolean = false;
  public replyForm: FormGroup;
  public title: AbstractControl;
  public text: AbstractControl;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ContactReplyComponent>,
    public memberService: MemberService,
    public messageService: MessageService,
    public fb: FormBuilder,
    public message: Message,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createReplyForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // create reply form
  public createReplyForm(): void {
    this.replyForm = this.fb.group({
      type: ['', Validators.compose([])],
      title: ['', Validators.compose([Validators.required])],
      text: ['', Validators.compose([Validators.required])],
      email: [this.memberService.user.email, Validators.compose([])],
      createdAt: ['', Validators.compose([])],
      uid: [this.memberService.user.uid, Validators.compose([])],
      to: [this.data.uid, Validators.compose([])],
      read: [false, Validators.compose([])]
    });
    this.title = this.replyForm.controls['title'];
    this.text = this.replyForm.controls['text'];
  }

  // submit event
  public onSubmit(value): any {
    // not valid form
    if (!this.replyForm.valid) {
      return false;
    };
    // if not emailVerified
    if (!this.memberService.user.emailVerified) {
      return false;
    }
    // loading start
    this.replyLoding = true;
    // value set
    value.createdAt = new Date().getTime();
    // send reply
    this.messageService.createMessage(value)
    .then(() => {
      // loading end
      this.replyLoding = false;
      // alert
      this.snackBar.open(this.message.successSendMessage, 'CLOSE', {duration: 3000});
      // close
      this.onClose();
    })
    .catch((err) => {
      // loading end
      this.replyLoding = false;
      // alert
      this.snackBar.open(this.message.failedSendMessage, 'CLOSE', {duration: 3000});
    });
  }

}
