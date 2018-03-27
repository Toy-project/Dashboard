import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-member-password',
  templateUrl: './member-password.component.html',
  styleUrls: ['./member-password.component.scss']
})
export class MemberPasswordComponent implements OnInit {

  private confirmForm: FormGroup;
  private password: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private message: Message,
    private dialogRef: MatDialogRef<MemberPasswordComponent>
  ) {
    this.createConfirmPasswordForm();
  }

  ngOnInit() {
  }

  // create confirm form
  private createConfirmPasswordForm() {
    this.confirmForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])]
    });
    this.password = this.confirmForm.controls['password'];
  }

  // dialog close event
  private onClose(password: string = null): void {
    this.dialogRef.close(password);
  }

  // confirmForm submit event
  private onSubmit(): any {
    // if not valid
    if (this.confirmForm.invalid) {
      return false;  
    }

    // close
    this.onClose(this.password.value);
  }

}
