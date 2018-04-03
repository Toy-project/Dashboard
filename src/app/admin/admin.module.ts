import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { ChartModule } from '../shared/chart/chart.module';
import { LayoutModule } from '../layout/layout.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminVisitComponent } from './admin-visit/admin-visit.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartModule,
    LayoutModule
  ],
  declarations: [
    AdminVisitComponent,
    AdminProjectComponent,
    AdminMemberComponent,
    AdminSettingComponent
  ]
})
export class AdminModule { }
