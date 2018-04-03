import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberMypageComponent } from './member-mypage/member-mypage.component';
import { MemberMessageComponent } from './member-message/member-message.component';

const routes: Routes = [
  {
    path: 'mypage',
    component: MemberMypageComponent
  },
  {
    path: 'message',
    component: MemberMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
