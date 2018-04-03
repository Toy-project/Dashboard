import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminVisitComponent } from './admin-visit/admin-visit.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';

const routes: Routes = [
  {
    path: 'visit',
    component: AdminVisitComponent
  },
  {
    path: 'project',
    component: AdminProjectComponent
  },
  {
    path: 'member',
    component: AdminMemberComponent
  },
  {
    path: 'setting',
    component: AdminSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
