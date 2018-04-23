import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

import { MemberService } from '../member.service';
import { AdminSettingService } from '../../admin/admin-setting/admin-setting.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { Message } from '../../shared/message/message';
import { Compare } from '../../shared/compare/compare';

import { MemberPasswordConfirmComponent } from '../member-password-confirm/member-password-confirm.component';
import { detachProjectedView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'app-member-mypage',
  templateUrl: './member-mypage.component.html',
  styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {

  public memberDefaultInfo: string;

  public infoLoading: boolean = false;
  public infoForm: FormGroup;
  public photo: AbstractControl;
  public modified: boolean = false;
  public fileSize: number = 1 * 1024 * 1024;

  public changePasswordForm: FormGroup;
  public newPassword: AbstractControl;
  public newPasswordConfirm: AbstractControl;
  public passwordLoading: boolean = false;

  public deleteLoading: boolean = false;

  public file: UploadFile;
  public options: UploaderOptions;
  public uploadInput: EventEmitter<UploadInput> =  new EventEmitter<UploadInput>();
  public humanizeBytes: Function = humanizeBytes;
  public dragOver: boolean;
  @ViewChild('preview') preview: ElementRef

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public memberService: MemberService,
    public adminSettingService: AdminSettingService,
    public cookieService: CookieService,
    public message: Message,
    public compare: Compare
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.createInfoForm();
    this.createChangePasswordForm();
  }

  // create info form
  public createInfoForm(): void {
    this.infoForm = this.fb.group({
      photo: ['', Validators.compose([])],
    });
    this.photo = this.infoForm.controls['photo'];
  }

  // create change password form
  public createChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      newPasswordConfirm: ['', Validators.compose([Validators.required])]
    }, {
      validator: this.compare.comparePassword('newPassword', 'newPasswordConfirm')
    });
    this.newPassword = this.changePasswordForm.controls['newPassword'];
    this.newPasswordConfirm = this.changePasswordForm.controls['newPasswordConfirm'];
  }

  // password error message event
  public getPasswordErrorMessage(): string {
    return this.newPassword.hasError('required') ? this.message.requiredPassword : this.newPassword.hasError('minlength') ? this.message.validatorPassword : '';
  }

  // passwrod confirm error message event
  public getPasswordConfrimErrorMessage(): string {
    return this.newPasswordConfirm.hasError('required') ? this.message.requiredPassword : this.newPasswordConfirm.hasError('compare') ? this.message.validatorConfirmPassword : '';
  }

  // get default image
  public async getDefaultImage(doc: string): Promise<any> {
    this.memberDefaultInfo = await this.adminSettingService.getDefaultImage(doc)
  }

  // send verify email
  public async sendVerifyEmail(): Promise<any> {
    try {
      await this.memberService.emailVerified();
      this.snackBar.open(this.message.successSendEmail, 'CLOSE', {duration: 3000});
    } catch (err) {
      this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
    }
  }

  // drag & drop upload 
  public onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // todo
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.file = output.file;
      this.onChangeFileSingle()
      console.log(this.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // todo
    } else if (output.type === 'removed') {
      // todo
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  // image preview event
  public onChangeFileSingle(): void {
    // type
    const type = this.file.type.split('/')[1];
    const size = this.file.size;
    
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || size <= this.fileSize) {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        this.preview.nativeElement.src = fileReader.result;
      }, false);

      if (this.file) {
        fileReader.readAsDataURL(this.file.nativeFile);
      }
    } else {
      this.file = null;
    }
  }

  // update user info
  public async updateUserProfile(value): Promise<any> {
    // in not file
    if (!this.file) {
      return false;
    } else {
      try {
        // loading
        this.infoLoading = true;
        // photo upload
        const photoUrl = await this.memberService.updateUserPhoto(this.memberService.user, this.file.nativeFile);
        // update photoURL
        await this.memberService.updateUserProfile({photoURL: photoUrl});
        // success update info
        this.snackBar.open(this.message.successUpdateInfo, 'CLOSE', {duration: 3000});
        // loading 
        this.infoLoading = false;
        // modified
        this.modified = false;
      } catch (err) {
        // failed file upload
        this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
        // loading end
        this.infoLoading = false;
      }
    }
  }

  // change password
  public changePassword(value): any {
    // validator
    if (this.changePasswordForm.invalid || (this.changePasswordForm.get('newPassword').value !== this.changePasswordForm.get('newPasswordConfirm').value)) {
      return false;
    }

    // open dialog event
    let dialogRef = this.dialog.open(MemberPasswordConfirmComponent, {
      minWidth: 300,
      maxWidth: 300,
      disableClose: true
    });
    // close event
    dialogRef.afterClosed().subscribe(async (password) => {
      if (!password) {
        // if password null
        return false;
      } else {
        // loading start
        this.passwordLoading = true;
        // if password
        try {
          // re-login
          await this.memberService.login(this.memberService.user.email, password);
          // update password
          await this.memberService.updateUserPassword(this.changePasswordForm.get('newPassword').value);
          // alert
          this.snackBar.open(this.message.successChangePassword, 'CLOSE', {duration: 3000});
          // re-create form
          this.createChangePasswordForm();
          // loading end
          this.passwordLoading = false;
        } catch (err) {
          // alert
          this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
          // loading end
          this.passwordLoading = false;
        }
      }
    })
  }

  // delete user
  public deleteUser(): void {
    // open dialog event
    let dialogRef = this.dialog.open(MemberPasswordConfirmComponent, {
      minWidth: 300,
      maxWidth: 300,
      disableClose: true
    });
    // close event
    dialogRef.afterClosed().subscribe(async (password) => {
      if (!password) {
        // if password null
        return false;
      } else {
        // loading start
        this.deleteLoading = true;
        // if password 
        try {
          await this.memberService.login(this.memberService.user.email, password);
          await this.memberService.signOut();
          this.router.navigate(['/home']);
        } catch (err) {
          // alert
          this.snackBar.open(this.memberService.authErrorHandler(err), 'CLOSE', {duration: 3000});
          // loading end
          this.deleteLoading = false;
        }
      }
    });
  }

}
