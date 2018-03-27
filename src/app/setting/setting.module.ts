import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  declarations: [
    SettingComponent
  ]
})
export class SettingModule { }
