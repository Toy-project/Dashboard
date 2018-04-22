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
  public async onSubmit(value) {
    if (this.loginForm.invalid) { 
      // if invalid
      return false;
    } else {
      // valid
      // loading start
      this.loginLoading = true;
      try {
        // login service
        await this.memberService.login(value.email, value.password);
        // loading end
        this.loginLoading = false;
        // close modal
        this.onClose();
      } catch(err) {
        // loading end
        this.loginLoading = false;
        // error handling
        this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
      }
    }
  }

}
