import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../member/member.service';
import { MessageService } from '../shared/message/message.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private messageLoading: boolean = false;
  private messageForm: FormGroup;
  private messageType: AbstractControl;
  private messageTitle: AbstractControl;
  private messageText: AbstractControl;

  private emailLoading: boolean = false;
  private emailForm: FormGroup;
  private email: AbstractControl;
  private emailTitle: AbstractControl;
  private emailText: AbstractControl;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private messageService: MessageService,
    private memberService: MemberService,
    private message: Message
  ) {
    this.createMessageForm();
    this.createEmailForm(); 
  }

  ngOnInit() {
    this.memberService.loginConfirm();
  }

  // create message form
  private createMessageForm(): void {
    this.messageForm = this.fb.group({
      type: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      text: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([])],
      createdAt: ['', Validators.compose([])],
      uid: ['', Validators.compose([])],
      to: ['', Validators.compose([])],
      read: [false, Validators.compose([])]
    });
    this.messageType = this.messageForm.controls['type'];
    this.messageTitle = this.messageForm.controls['title'];
    this.messageText = this.messageForm.controls['text'];
  }
  
  // create email form
  private createEmailForm(): void {
    this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      title: ['', Validators.compose([Validators.required])],
      text: ['', Validators.compose([Validators.required])]
    });
    this.email = this.emailForm.controls['email'];
    this.emailTitle = this.emailForm.controls['title'];
    this.emailText = this.emailForm.controls['text'];
  }

  // send message
  private onSendMessage(value): any {
    // login confirm
    this.memberService.loginConfirm();
    // not valid
    if (!this.messageForm.valid) {
      return false;
    }
    // if not login
    if (!this.memberService.user.logined) {
      // alert
      this.snackBar.open(this.message.requiredLogin, 'CLOSE', {duration: 3000});
      return false;
    };
    // if not emailVerified
    if (!this.memberService.user.emailVerified) {
      this.snackBar.open(this.message.NotemailVerified, 'CLOSE', {duration: 3000});
      return false;
    };
    // loading start
    this.messageLoading = true;
    // value set
    value.createdAt = new Date().getTime();
    value.uid = this.memberService.user.uid;
    value.email = this.memberService.user.email;
    // get admin
    this.memberService.getDatabaseAdmin().then((res) => {
      // success get admin
      res.docs.forEach((doc, ind) => {
        // to
        value.to = doc.data().uid;
        // create
        this.messageService.createMessage(value)
        .then(() => {
          if ((ind + 1) === res.docs.length) {
            // re-create from
            this.createMessageForm()
            // loading end
            this.messageLoading = false;
            // alert
            this.snackBar.open(this.message.successSendMessage, 'CLOSE', {duration: 3000});
          } else {
            // continue
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
      });
    })
    .catch((err) => {
      // failed get admin
      // loading end
      this.messageLoading = false;
      // alert 
      this.snackBar.open(this.message.failedSendMessage, 'CLOSE', {duration: 3000});
    })
  }

  // send email
  private onSendEmail(value): void {
    alert('준비 중 입니다.');
  }

}
