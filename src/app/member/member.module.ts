import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MemberMypageComponent } from './member-mypage/member-mypage.component';

@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  declarations: [
    MemberComponent,
    MemberMypageComponent
  ]
})
export class MemberModule { }
