import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';
import { UploaderModule } from '../shared/uploader/uploader.module';

import { MemberRoutingModule } from './member-routing.module';
import { MemberMypageComponent } from './member-mypage/member-mypage.component';
import { MemberMessageComponent } from './member-message/member-message.component';

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    UploaderModule
  ],
  declarations: [
    MemberMypageComponent,
    MemberMessageComponent
  ]
})
export class MemberModule { }
