import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-member-level',
  templateUrl: './member-level.component.html',
  styleUrls: ['./member-level.component.scss']
})
export class MemberLevelComponent implements OnInit {

  public levelLoading: boolean = false;
  public changeLevelForm: FormGroup;
  public level: AbstractControl;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MemberLevelComponent>,
    public memberService: MemberService,
    public fb: FormBuilder,
    public message: Message,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.createChangeLevelForm();
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // create chang level form
  public createChangeLevelForm(): void {
    this.changeLevelForm = this.fb.group({
      level: ['', Validators.compose([Validators.required])]
    });
    this.level = this.changeLevelForm.controls['level'];
  }

  // changeLevelForm submit event
  public onSubmit(value): any {
    // if not valid
    if (this.changeLevelForm.valid) {
      return false;
    }
    
    // loading start
    this.levelLoading = true;
    // value set
    value['key'] = this.data.key;
    value.level = parseInt(value.level);
    // loginconfirm
    this.memberService.loginConfirm();
    // check level
    this.memberService.getDatabaseUser(this.memberService.user.uid).get()
    .then((res) => {
      if (res.data().level < value.level) {
        throw new Error('Too High');
      } else {
        this.memberService.updateDatabaseUserLevel(value)
        .then(() => {
          // loading end
          this.levelLoading = false;
          // success update
          this.snackBar.open(this.message.successChangeLevel, 'CLOSE', {duration: 3000});
          // close
          this.onClose();
        })
        .catch((err) => {
          throw new Error(err);
        })
      }
    })
    .catch((err) => {
      // loading end
      this.levelLoading = false;
      // alert
      if (err.message === 'Too High') {
        this.snackBar.open(this.message.failedChangeLevelHigh, 'CLOSE', {duration: 3000});
      } else {
        this.snackBar.open(this.message.failedChangeLevel, 'CLOSE', {duration: 3000});
      }
    });
  }

}
