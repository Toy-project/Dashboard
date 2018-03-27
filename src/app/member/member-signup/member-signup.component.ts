import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-member-signup',
  templateUrl: './member-signup.component.html',
  styleUrls: ['./member-signup.component.scss']
})
export class MemberSignupComponent implements OnInit {

  private signupLoading: boolean = false;
  private signupForm: FormGroup;
  private email: AbstractControl;
  private password: AbstractControl;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MemberSignupComponent>,
    private router: Router,
    private memberService: MemberService,
    private fb: FormBuilder,
    private message: Message
  ) { }

  ngOnInit() {
    this.createSignUpForm(); 
  }

  // create signup form
  private createSignUpForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
  }

  // email error message event
  private getEmailErrorMessage(): string {
    return this.email.hasError('required') ? this.message.requiredEmail : this.email.hasError('email') ? this.message.validatorEmail : '';
  }

  // password error message event
  private getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? this.message.requiredPassword : this.password.hasError('minlength') ? this.message.validatorPassword : '';
  }

  // dialog close event
  private onClose(): void {
    this.dialogRef.close();
  }

  // signupForm submit event
  private onSubmit(value): any {
    // if not valid
    if (this.signupForm.invalid) {
      return false;
    }

    // loading start
    this.signupLoading = true;
    // singup
    this.memberService.signUp(value)
    .then(() => {
      // login confirm
      this.memberService.loginConfirm();
      // signup database
      this.memberService.signUpDatabase(this.memberService.user)
      .then(() => {
        // send verify mail
        this.memberService.emailVerified();
        // loading end
        this.signupLoading = false;
        // alert
        this.snackBar.open(this.message.successSignup, 'CLOSE');
        // dialog close
        this.onClose();
      })
      .catch((err) => {
        // rollback
        this.memberService.signOut();
        this.memberService.signOutDatabase(this.memberService.user.uid);
        this.memberService.deleteLocalstorage();
        // throw err
        throw new Error(err);
      })
    })
    .catch((err) => {
      // alert
      this.snackBar.open(this.message.failedSignup, 'CLOSE', {duration: 3000});
      // loading end
      this.signupLoading = false;
    });
  }

}
