import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ChartModule } from '../shared/chart/chart.module';
import { LayoutModule } from '../layout/layout.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ChartModule,
    LayoutModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
