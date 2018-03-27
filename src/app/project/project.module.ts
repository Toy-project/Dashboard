import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  entryComponents: [
    ProjectDeleteComponent
  ],
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectDeleteComponent
  ]
})
export class ProjectModule { }
