import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { MemberMypageComponent } from './member-mypage/member-mypage.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent
  },
  {
    path: 'mypage',
    component: MemberMypageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
