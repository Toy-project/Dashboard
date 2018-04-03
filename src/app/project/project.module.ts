import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectCreateComponent
  ]
})
export class ProjectModule { }
