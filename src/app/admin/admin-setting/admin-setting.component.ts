import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminSettingService } from './admin-setting.service';
import { MemberService } from '../../member/member.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  public memberDefaultImageLoading: boolean = false;
  public memberDefaultImage: FormGroup;
  public memberDefaultSrc: AbstractControl;
  public memberDefaultInfo: Object = {};
  public memberDefaultImageFile: any;
  public memberDefaultImageFileSize: number = 1 * 1024 * 1024;

  constructor(
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
    public adminSettingService: AdminSettingService,
    public memberService: MemberService,
    public message: Message
  ) {
    this.createMemberDefaultImageForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getDefaultImage('member');
  }

  // create image form
  public createMemberDefaultImageForm(): void {
    this.memberDefaultImage = this.fb.group({
      src: ['', Validators.compose([])],
      lastUpdatedAt: ['', Validators.compose([])]
    });
    this.memberDefaultSrc = this.memberDefaultImage.controls['src'];
  }

  // get default image
  public getDefaultImage(doc: string): any {
    if (!this.memberService.user.logined) {
      return false;
    }
    
    this.adminSettingService.getDefaultImage(doc)
    .then((res) => {
      this.memberDefaultInfo = res.data();
    })
    .catch((err) => {
      // todo
    })
  }

  // image thumbnail preview event
  public onChangeMemberDefaultImageFile(img, fileData): void {
    // type
    const type = fileData.files.length ? fileData.files[0].type.split('/')[1] : null;
    const size = fileData.files ? fileData.files[0].size : Infinity;
    // validator
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || fileData.files[0].size <= this.memberDefaultImageFileSize) {
      this.memberDefaultImageFile = fileData.files[0];
      const fileReader = new FileReader();

      // file reader load event
      fileReader.addEventListener('load', () => {
        img.src = fileReader.result;
      }, false);

      if (this.memberDefaultImageFile) {
        fileReader.readAsDataURL(this.memberDefaultImageFile);
      }
    } else {
      // alert
      this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
    }
  }

  // default image upload
  public memberDefaultImageUpload(value): any {
    if (this.memberDefaultImage.invalid) {
      return false;
    }

    // loading start
    this.memberDefaultImageLoading = true;
    // upload 
    this.adminSettingService.uploadFile('profile', this.memberDefaultImageFile)
    .then((res) => {
      // value set
      value.src = res;
      value.lastUpdatedAt = new Date().getTime();
      // update
      this.adminSettingService.updateDefaultImage('member', value)
      .then(() => {
        // loading end
        this.memberDefaultImageLoading = false;
        // alert
        this.snackBar.open(this.message.successUploadDefaultImage, 'CLOSE', {duration: 3000});
      })
      .catch((err) => {
        throw new Error('Failed Update');
      });
    })
    .catch((err) => {
      if (err.message === 'Failed Update') {
        // rollback
        // todo
      };
      // loading end
      this.memberDefaultImageLoading = false;
      // alert
      this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
    })
  }

}
