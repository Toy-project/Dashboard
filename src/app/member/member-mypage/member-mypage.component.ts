import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { MemberService } from '../member.service';
import { AdminSettingService } from '../../admin/admin-setting/admin-setting.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { Message } from '../../shared/message/message';

import { MemberPasswordConfirmComponent } from '../member-password-confirm/member-password-confirm.component';

@Component({
  selector: 'app-member-mypage',
  templateUrl: './member-mypage.component.html',
  styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {

  public access: boolean;
  public accessFailedMessage: string;
  public defaultImage: string = this.cookieService.getCookie('defaultImage');

  public infoLoading: boolean = false;
  public infoForm: FormGroup;
  public photo: AbstractControl;
  public modified: boolean = false;
  public file: any;
  public fileSize: number = 1 * 1024 * 1024;

  public changePasswordForm: FormGroup;
  public newPassword: AbstractControl;
  public newPasswordConfirm: AbstractControl;
  public comparePassword: boolean = false;
  public passwordLoading: boolean = false;

  public deleteLoading: boolean = false;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public memberService: MemberService,
    public adminSettingService: AdminSettingService,
    public cookieService: CookieService,
    public message: Message,
  ) {
    this.createInfoForm();
    this.createChangePasswordForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.access = this.memberService.user.logined ? true : false;
    this.accessFailedMessage = this.memberService.user.logined ? '' : this.message.requiredLogin;
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
      validator: this.comparePasswordEvent('newPassword', 'newPasswordConfirm')
    });
    this.newPassword = this.changePasswordForm.controls['newPassword'];
    this.newPasswordConfirm = this.changePasswordForm.controls['newPasswordConfirm'];
  }

  // compare password 
  public comparePasswordEvent(password: string, passwordConfirm: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const passwd = control.get(password).value;
      const passwdConfirm = control.get(passwordConfirm).value;
      if (!passwd || !passwdConfirm) {
        return null;
      } else if (passwd !== passwdConfirm) {
        return null;
      } else {
        return {compare: true};
      }
    }
  }

  // password error message event
  public getPasswordErrorMessage(): string {
    return this.newPassword.hasError('required') ? this.message.requiredPassword : this.newPassword.hasError('minlength') ? this.message.validatorPassword : '';
  }

  // passwrod confirm error message event
  public getPasswordConfrimErrorMessage(): string {
    return this.newPasswordConfirm.hasError('required') ? this.message.requiredPassword : this.comparePassword ? this.message.validatorConfirmPassword : '';
  }

  // send verify email
  public sendVerifyEmail(): void {
    this.memberService.emailVerified()
    .then(() => {
      // alert
      this.snackBar.open(this.message.successSendEmail, 'CLOSE', {duration: 3000});
    })
    .catch((err) => {
      // alert
      this.snackBar.open(this.message.failedSendEmail, 'CLOSE', {duration: 3000});
    });
  }

  // image preview event
  public onChangeFile(img, fileData): void {
    // type
    const type = fileData.files.length ? fileData.files[0].type.split('/')[1] : null;
    // validator
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || fileData.files[0].size <= this.fileSize) {
      this.file = fileData.files[0];
      const fileReader = new FileReader();

      // file reader load event
      fileReader.addEventListener('load', () => {
        img.src = fileReader.result;
      }, false);

      if (this.file) {
        fileReader.readAsDataURL(this.file);
      };
    } else if(fileData.files.length) {
      // failed validator
      this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
    } else {
      // todo
    }
    
  }

  // update user info
  public updateUserProfile(value): any {
    // in not file
    if (!this.file) {
      return false;
    };

    // loading
    this.infoLoading = !this.infoLoading;
    // upload file
    this.memberService.updateUserPhoto(this.memberService.user, this.file).then((res) => {
      // success file upload
      this.memberService.updateUserProfile({
        photoURL: res
      })
      .then(() => {
        // getUser
        this.memberService.loginConfirm();
        // success update info
        this.snackBar.open(this.message.successUpdateInfo, 'CLOSE', {duration: 3000});
        // loading 
        this.infoLoading = !this.infoLoading;
        // modified
        this.modified = !this.modified;
      });
    })
    .catch((err) => {
      // failed file upload
      this.snackBar.open(this.message.failedUpdateFile, 'CLOSE', {duration: 3000});
      // loading 
      this.infoLoading = !this.infoLoading;
    });
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
    dialogRef.afterClosed().subscribe((password) => {
      // loading start
      this.passwordLoading = true;
      // if password null
      if (!password) {
        this.passwordLoading = false;
        return false;
      }
      // re-login
      this.memberService.login(this.memberService.user.email, password)
      .then(() => {
        // success re-login
        this.memberService.updateUserPassword(this.changePasswordForm.get('newPassword').value)
        .then(() => {
          // success change password
          this.snackBar.open(this.message.successChangePassword, 'CLOSE', {duration: 3000});
          // login confirm
          this.memberService.loginConfirm();
          // change password form reset
          this.createChangePasswordForm();
          // loading end
          this.passwordLoading = false;
        })
        .catch((err) => {
          throw new Error('Update Failed');
        });
      })
      .catch((err) => {
        // loading end
        this.passwordLoading = false;
        // alert
        if (err.message === 'Update Failed') {
          this.snackBar.open(this.message.failedChangePassword, 'CLOSE', {duration: 3000});
        } else {
          this.snackBar.open(this.message.wrongPassword, 'CLOSE', {duration: 3000});
        }
      });
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
    dialogRef.afterClosed().subscribe((password) => {
      // if password null
      if (!password) {
        return false;
      }
      // loading start
      this.deleteLoading = true;
      // re-login
      this.memberService.login(this.memberService.user.email, password)
      .then(() => {
        // success re-login
        this.memberService.deleteUserPhoto(this.memberService.user)
        .then(() => {
          // success delete photo
          this.memberService.signOutDatabase(this.memberService.user.uid)
          .then(() => {
            // success delete database
            this.memberService.signOut()
            .then(() => {
              // success delete user
              // redirect home
              this.router.navigate(['/home']);
              window.location.reload();
            })
            .catch((err) => {
              // loading end
              this.deleteLoading = false;
              // failed delete user
              this.snackBar.open(this.message.failedDeleteUser, 'CLOSE', {duration: 3000});
            });
          });
        })
        .catch((err) => {
          // loading end
          this.deleteLoading = false;
          // failed delete photo
          this.snackBar.open(this.message.failedDeletePhoto, 'CLOSE', {duration: 3000});
        })
      })
      .catch((err) => {
        // loading end
        this.deleteLoading = false;
        // failed re-login
        this.snackBar.open(this.message.wrongPassword, 'CLOSE', {duration: 3000});
      });
    });
  }

}
