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

  public signupLoading: boolean = false;
  public signupForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MemberSignupComponent>,
    public router: Router,
    public memberService: MemberService,
    public fb: FormBuilder,
    public message: Message
  ) { }

  ngOnInit() {
    this.createSignUpForm(); 
  }

  // create signup form
  public createSignUpForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
  }

  // email error message event
  public getEmailErrorMessage(): string {
    return this.email.hasError('required') ? this.message.requiredEmail : this.email.hasError('email') ? this.message.validatorEmail : '';
  }

  // password error message event
  public getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? this.message.requiredPassword : this.password.hasError('minlength') ? this.message.validatorPassword : '';
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // signupForm submit event
  public async onSubmit(value): Promise<any> {
    // if not valid
    if (this.signupForm.invalid) {
      return false;
    } else {
      try {
        // loading start
        this.signupLoading = true;
        // signup
        await this.memberService.signUp(value);
        // login confirm
        this.memberService.loginConfirm();
        // signup database
        await this.memberService.signUpDatabase(this.memberService.user);
        // send verify mail
        this.memberService.emailVerified();
        // loading end
        this.signupLoading = false;
        // alert
        this.snackBar.open(this.message.successSignup, 'CLOSE');
        // dialog close
        this.onClose();
      } catch(err) {
        if(this.memberService.user) {
          // rollback
          this.memberService.signOut();
          this.memberService.signOutDatabase(this.memberService.user.uid);
          this.memberService.deleteLocalstorage();
        };
        // alert
        this.snackBar.open(this.message.failedSignup, 'CLOSE', {duration: 3000});
        // loading end
        this.signupLoading = false;
      }
    }
  }

}
