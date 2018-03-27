import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SettingService } from './setting.service';
import { MemberService } from '../member/member.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  private loadingFixed: boolean = true;

  private imageLoading: boolean = false;
  private imageForm: FormGroup;
  private defaultSrc: AbstractControl;
  private defaultInfo: Object = {};
  private defaultImageFile: any;
  private DefaultImageFileSize: number = 1 * 1024 * 1024;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private settingService: SettingService,
    private memberService: MemberService,
    private message: Message
  ) {
    this.createImageForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getDefaultImage();
  }

  // create image form
  private createImageForm(): void {
    this.imageForm = this.fb.group({
      src: ['', Validators.compose([])],
      lastUpdatedAt: ['', Validators.compose([])]
    });
    this.defaultSrc = this.imageForm.controls['src'];
  }

  // get default image
  private getDefaultImage() {
    if (this.memberService.user.logined) {
      this.settingService.getDefaultImage('member')
      .then((res) => {
        this.defaultInfo = res.data();
      })
      .catch((err) => {
        // todo
      })
    } else {
      // todo
    }
  }

  // image thumbnail preview event
  private onChangeImageFile(img, fileData): void {
    // type
    const type = fileData.files.length ? fileData.files[0].type.split('/')[1] : null;
    const size = fileData.files ? fileData.files[0].size : Infinity;
    // validator
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || fileData.files[0].size <= this.DefaultImageFileSize) {
      this.defaultImageFile = fileData.files[0];
      const fileReader = new FileReader();

      // file reader load event
      fileReader.addEventListener('load', () => {
        img.src = fileReader.result;
      }, false);

      if (this.defaultImageFile) {
        fileReader.readAsDataURL(this.defaultImageFile);
      }
    } else if (fileData.files.length) {
      // failed validator
      this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
    } else {
      // todo
    }
  }

  // default image upload
  private defaultImageUpload(value): void {
    if (this.imageForm.valid) {
      // loading start
      this.imageLoading = true;
      // upload 
      this.settingService.uploadFile('profile', this.defaultImageFile)
      .then((res) => {
        // value set
        value.src = res;
        value.lastUpdatedAt = new Date().getTime();
        // update
        this.settingService.updateDefaultImage('member', value)
        .then(() => {
          // loading end
          this.imageLoading = false;
          // alert
          this.snackBar.open(this.message.successUploadDefaultImage, 'CLOSE', {duration: 3000});
        })
        .catch((err) => {
          // loading end
          this.imageLoading = false;
          // alert
          this.snackBar.open(this.message.failedUploadDefaultImage, 'CLOSE', {duration: 3000});
        });
      })
      .catch((err) => {
        // loading end
        this.imageLoading = false;
        // alert
        this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
      })
    } else {
      // todo
    }
  }

}
