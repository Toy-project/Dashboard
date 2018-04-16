import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { MemberSignupComponent } from '../member-signup/member-signup.component';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.scss']
})
export class MemberLoginComponent implements OnInit {

  public loginLoading: boolean = false;
  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MemberLoginComponent>,
    public router: Router,
    public memberService: MemberService,
    public fb: FormBuilder,
    public message: Message
  ) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  // create login form
  public createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  // signup dialog open event
  public goSignup(): void {
    // close login
    this.onClose();
    // open signup
    let dialogRef = this.dialog.open(MemberSignupComponent, {
      minWidth: 300,
      maxWidth: 300,
      disableClose: true
    });
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // loginForm submit event
  public onSubmit(value): any {
    // if not valid
    if (this.loginForm.invalid) {
      return false;
    };

    // loading start
    this.loginLoading = true;
    // login start
    this.memberService.login(value.email, value.password)
    .then((res) => {
      // login confirm
      this.memberService.loginConfirm();
      // redirect
      window.location.reload();
    })
    .catch((err) => {
      // loading end
      this.loginLoading = false;
      // if login
      this.memberService.logout();
      // clear localstorage
      this.memberService.deleteLocalstorage();
      // alert
      this.snackBar.open(this.message.failedLogin, 'CLOSE', {duration: 3000});
    });
  }

}
