import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as shape from 'd3-shape';
import * as d3 from 'd3';

import { 
  NgxChartsModule 
} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgxChartsModule
  ],
  declarations: []
})
export class ChartModule { }
