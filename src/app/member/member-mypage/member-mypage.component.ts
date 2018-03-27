import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { MemberService } from '../member.service';
import { SettingService } from '../../setting/setting.service';
import { CookieService } from '../../shared/cookie/cookie.service';
import { MessageService } from '../../shared/message/message.service';
import { Message } from '../../shared/message/message';

import { MemberPasswordComponent } from '../member-password/member-password.component';
import { ContactDetailComponent } from '../../contact/contact-detail/contact-detail.component';

@Component({
  selector: 'app-member-mypage',
  templateUrl: './member-mypage.component.html',
  styleUrls: ['./member-mypage.component.scss']
})
export class MemberMypageComponent implements OnInit {

  private loadingFixed: boolean = true;
  private defaultImage: string = this.cookieService.getCookie('defaultImage');

  private infoLoading: boolean = false;
  private infoForm: FormGroup;
  private photo: AbstractControl;
  private modified: boolean = false;
  private file: any;
  private fileSize: number = 1 * 1024 * 1024;

  private changePasswordForm: FormGroup;
  private newPassword: AbstractControl;
  private newPasswordConfirm: AbstractControl;
  private comparePassword: boolean = false;
  private passwordLoading: boolean = false;

  private messageList: Array<any> = [];
  private deleteLoading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private memberService: MemberService,
    private settingService: SettingService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private message: Message,
  ) {
    this.createInfoForm();
    this.createChangePasswordForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getMessageList(10);
  }

  // create info form
  private createInfoForm(): void {
    this.infoForm = this.fb.group({
      photo: ['', Validators.compose([])],
    });
    this.photo = this.infoForm.controls['photo'];
  }

  // create change password form
  private createChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      newPasswordConfirm: ['', Validators.compose([Validators.required])]
    });
    this.newPassword = this.changePasswordForm.controls['newPassword'];
    this.newPasswordConfirm = this.changePasswordForm.controls['newPasswordConfirm'];
  }

  // get message list
  private getMessageList(limit: number): any {
    // if not valid
    if (!this.memberService.user.logined) {
      return false;
    }

    // get message list
    this.messageService.getAllMessage(this.memberService.user.uid, limit).onSnapshot((res) => {
      this.messageList = res.docs;
    });
  }

  // update message read
  private readMessage(key: string, data: any): void {
    // open dialog
    let dialogRef = this.dialog.open(ContactDetailComponent, {
      minWidth: 300,
      maxWidth: 500,
      data: data
    });
    
    // update message read
    this.messageService.updateMessageRead(key)
    .then(() => {
      // todo
    })
    .catch((err) => {
      // todo
    })
  }

  // compare password 
  private comparePasswordEvent(event) {
    this.comparePassword = event.target.value !== this.changePasswordForm.get('newPassword').value ? true : false;
  }

  // password error message event
  private getPasswordErrorMessage(): string {
    return this.newPassword.hasError('required') ? this.message.requiredPassword : this.newPassword.hasError('minlength') ? this.message.validatorPassword : '';
  }

  // passwrod confirm error message event
  private getPasswordConfrimErrorMessage(): string {
    return this.newPasswordConfirm.hasError('required') ? this.message.requiredPassword : this.comparePassword ? this.message.validatorConfirmPassword : '';
  }

  // send verify email
  private sendVerifyEmail(): void {
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
  private onChangeFile(img, fileData): void {
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
  private updateUserProfile(value): any {
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
      })
      .catch((err) => {
        throw new Error(err);
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
  private changePassword(value): any {
    // validator
    if (this.changePasswordForm.invalid && (this.changePasswordForm.get('newPassword').value !== this.changePasswordForm.get('newPasswordConfirm').value)) {
      return false;
    }

    // open dialog event
    let dialogRef = this.dialog.open(MemberPasswordComponent, {
      minWidth: 300,
      maxWidth: 500,
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
  private deleteUser(): void {
    // open dialog event
    let dialogRef = this.dialog.open(MemberPasswordComponent, {
      minWidth: 300,
      maxWidth: 500,
      disableClose: true
    });
    // close event
    dialogRef.afterClosed().subscribe((password) => {
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
