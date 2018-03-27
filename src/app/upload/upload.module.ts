import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { ProjectCreateComponent } from '../project/project-create/project-create.component';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  declarations: [
    UploadComponent,
    ProjectCreateComponent
  ]
})
export class UploadModule { }
