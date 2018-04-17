import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../member/member.service';
import { MessageService } from '../message/message.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public messageLoading: boolean = false;
  public messageForm: FormGroup;
  public messageType: AbstractControl;
  public messageTitle: AbstractControl;
  public messageText: AbstractControl;

  public emailLoading: boolean = false;
  public emailForm: FormGroup;
  public email: AbstractControl;
  public emailTitle: AbstractControl;
  public emailText: AbstractControl;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
    public messageService: MessageService,
    public memberService: MemberService,
    public message: Message
  ) {
    this.createMessageForm();
    this.createEmailForm(); 
  }

  ngOnInit() {
    this.memberService.loginConfirm();
  }

  // create message form
  public createMessageForm(): void {
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
  public createEmailForm(): void {
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
  public onSendMessage(value): any {
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
      this.snackBar.open(this.message.notEmailVerified, 'CLOSE', {duration: 3000});
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
  public onSendEmail(value): void {
    alert('준비 중 입니다.');
  }

}
